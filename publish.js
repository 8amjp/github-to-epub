const Epub = require("epub-gen")
const rp = require("request-promise-native")
const cheerio = require('cheerio')
const config = require('./config')

getEpisodes()
.then(function (episodes) {
    return  getContents(episodes);
})
.then(function (contents) {
    publish(contents)
})


function getEpisodes() {
    return new Promise(function (resolve, reject) {
        rp({
            uri: config.url,
            headers: {
                'User-Agent': 'Request-Promise',
                'Accept': 'application/vnd.github.v3+json',
                'Authorization': `token ${config.token}`
            }
        })
        .then(function (response) {
            resolve(JSON.parse(response));
        })
        .catch(function (err) {
            reject(err);
        });
    });
}

function getContents(episodes) {
    return Promise.all( episodes.map( function(episode) {
        return getContent(episode.url);
    }))
    .then(function(values) {
        return values;
    })
}

function getContent(url) {
    return new Promise(function (resolve, reject) {
        rp({
            uri: url,
            headers: {
                'User-Agent': 'Request-Promise',
                'Accept': 'application/vnd.github.v3.html+json',
                'Authorization': `token ${config.token}`,
            }
        })
        .then(function (content) {
            resolve(content);
        })
        .catch(function (err) {
            reject(err);
        });
    })
}

function publish(contents) {
    let option = config.epub;
    option.content = contents.map( function(content) {
        const $ = cheerio.load(content)
        return {
            title: $('h1').text(),
            data: content
        }
    });
    new Epub(option);
}


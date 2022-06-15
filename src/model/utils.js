import path from 'path'
export function urlResolve(arg_url) {
    // ##### COMMENTARY #####
    // let end_protocol = arg_url.lastIndexOf("//")
    // let protocol = arg_url.slice(0, end_protocol)
    // let end_domain = arg_url.indexOf('/', end_protocol + 2)
    // let path_url = arg_url.slice(end_domain)
    // let new_path = path.resolve(path_url)
    // let domain_url = arg_url.slice(0, end_domain)
    // let new_url = domain_url + new_path

    let end_domain = arg_url.indexOf('/', arg_url.indexOf("//") + 2)
    return arg_url.slice(0, end_domain) + path.resolve(arg_url.slice(end_domain))
}

export function getDomain(arg_url) {
    return arg_url.substring(0, arg_url.indexOf('/', arg_url.indexOf("//") + 2))
}

export function is_url(arg) {
    let res = arg.match(/^[a-zA-Z]*:\/\//) != null
    return res
}


export function joinAndResolvePahtOrUrl(base, file) {
    if (is_url(base)) { // Is url
        return urlResolve(base + '/' + file)
    } else {
        return path.resolve(path.join(base, file))
    }
}

// USE FOR TEST SOME UTILS FUNCTION
// let test = "wss://test.orness.com////tech/dev/../ditrit//toscator.js"
// console.log(getDomain(test));
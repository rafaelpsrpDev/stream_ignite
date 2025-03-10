export function routeRegex(path) {
   
    const routeRegex = /:([a-zA-z]+)/g
    const pathWithParams = path.replaceAll(routeRegex, '(?<$1>[a-z0-9\-_]+)')

    //console.log(pathWithParams)

    const pathRegex = new RegExp(`^${pathWithParams}$`)

    return pathRegex;
}
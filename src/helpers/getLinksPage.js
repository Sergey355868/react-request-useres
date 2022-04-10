export function getCurrentPage(currentUrl) {
    return  currentUrl.match(/\d+$/)[0];
}
export function getUrlByNumber(url, number) {
    return url.replace(/\d+$/, number);
}
export function getLinks(links) {
    return links && [...links.matchAll(/<(?<link>[^<>]+?(?<page>\d+))>.*?"(?<move>[a-z]+)",?/g)];
}
export function _clearLinksAndPages(array_links, array_pages) {
    [array_links, array_pages].forEach(([obj_clear, value]) => {
        Object.keys(obj_clear).forEach(key => obj_clear[key] = value);
    });
}
export function writeLinksAndPages(currentUrl,links_array, links, pages) {
    let isReturn = false;
    if (!links && !pages) {
        links = {};
        pages = {};
        isReturn = true;
    }
    // записываем текущую страницу и ссылку.
    if (typeof currentUrl === "string") {
        links.current = currentUrl;
        pages.current_page = getCurrentPage(currentUrl);
    }
    // если получили ссылки записываем их и последнюю страницу
    if (Array.isArray(links_array)) {
        links_array.forEach(link_array => {
            let { link, move, page } = link_array.groups;
            links[move] = link;
            move ==="last" && (pages.last_page = page);
        });
    }
    // если нет последней ссылки(страница одна)
    if (!links.last) {
        pages.last_page = pages.current_page;
    }
    if (isReturn) {
        return { links, pages };
    }
}
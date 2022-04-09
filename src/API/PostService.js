export  class PostService {

    static  async getByName(name) {
        let url = `https://api.github.com/search/users?q=${ name }in:login&per_page=100&page=1`;
        let response  =  await  fetch(url);
        return  [response, url];
    }
    static async getByUrl(url) {
        let response = await fetch(url);
        return  [response, url ];
    }
}
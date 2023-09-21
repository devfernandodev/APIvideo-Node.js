import { randomUUID } from "crypto";

export class databaseMemory {
  #videos = new Map();

  list(search) {
    //converte uma estrutura de dados que nao é um array para um array
    return Array.from (this.#videos.entries())
     .map((videoArray)=>{
      const id = videoArray[0]
      const data = videoArray[1]

      return{
        id,
        ...data,
      }
    })
    .filter(video =>{
      if(search){ 
      return video.title.includes(search)
    }

    
    return true
    })
  }
  create(video) {
    const videoId = randomUUID();
    // UUID = UNIQUE UNIVERSAL ID -sempre retorna um id unico
    this.#videos.set(videoId, video);
  }

  update(id, video) {
    this.#videos.set(id, video);
  }

  delete(id) {
    this.#videos.delete(id);
  }
}

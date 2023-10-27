
export class MenuBuilder {
    private div: HTMLDivElement
    private ul: HTMLUListElement

    constructor(private id: string) {
        this.div = document.createElement('div')
        this.div.id = id
        this.div.classList.add("radial")
        this.div.classList.add("circle-center")
        this.div.style.position = "absolute"
        this.div.style.left = "50%"
        this.div.style.top = "50%"
        this.div.style.zIndex = "2000"

        document.body.appendChild(this.div)

        this.ul = document.createElement('ul')
        this.div.appendChild(this.ul)
    }

    add(id: string, classes: string[], cb: Function) {
        const li = document.createElement('li')
        li.classList.add('radialItem')
        li.id = id
        this.ul.appendChild(li)

        // <a href=""><i class="fa-solid fa-comment-dots"></i></a>
        const a = document.createElement('a')
        a.addEventListener("click", e => cb(e))

        const i = document.createElement('i')
        classes.forEach( c => i.classList.add(c))
        a.appendChild(i)
    }
}

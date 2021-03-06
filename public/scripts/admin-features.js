function addIngredient () {

    const ingredients = document.querySelector("#addIngredient")
    const fieldcontainer = document.querySelectorAll(".ingredient")

    const newField = fieldcontainer[fieldcontainer.length - 1].cloneNode(true);

    if (newField.children[0].value == "") return false;

    newField.children[0].value = "";
    ingredients.appendChild(newField)
}

const ingredients = document.querySelector(".addIngredient")

if(ingredients)

ingredients.addEventListener("click", addIngredient);


function addPreparation () {

const preparation = document.querySelector("#addPreparation")
const fieldcontainer = document.querySelectorAll(".preparation")

const newField = fieldcontainer[fieldcontainer.length -1].cloneNode(true);

if (newField.children[0].value="") return false;

newField.children[0].value = "";
preparation.appendChild(newField)

}

const preparation = document.querySelector(".addPreparation")

if(preparation)

preparation.addEventListener("click", addPreparation);







// SCRIPT DE HEADER

const currentPage = location.pathname

const menuitems = document.querySelectorAll("header #logo a")



for (item of menuitems) {
    if (currentPage.includes(item.getAttribute("href"))){
        item.classList.add("active")
    }
}




const PhotosUpload = {
    input: "",
    preview:  document.querySelector('#photos-preview'),
    uploadLimit: 5,
    files: [],
    handleFileInput(event) {

        const {files: fileList} = event.target
        PhotosUpload.input = event.target

        if(PhotosUpload.hasLimit(event)) return
        

        Array.from(fileList).forEach(file => {

            PhotosUpload.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {

                const image = new Image ()
                image.src = String(reader.result)

                const div = PhotosUpload.getContainer(image)

                PhotosUpload.preview.appendChild(div)



            }

            reader.readAsDataURL(file)


        })

        PhotosUpload.input.files = PhotosUpload.getAllFiles()

    },
    hasLimit(event) {

        const {uploadLimit, input, preview} = PhotosUpload
        const { files: fileList} = input

        if(fileList.length > uploadLimit) {

            alert(`Envie no máximo ${uploadLimit} fotos`)
            event.preventDefault()
            return true

        }

        const photosDiv = []
        preview.childNodes.forEach(item => {

            if(item.classList && item.classList.value == "photo")
            photosDiv.push(item)

        })

        const totalPhotos = fileList.length + photosDiv.length

        if(totalPhotos > uploadLimit) {

            alert("Você atingiu o limite máximo de fotos")
            event.preventDefault()
            return true
        }

        return false

    },
    getAllFiles() {

        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUpload.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files

    },
    getContainer(image) {

        const div = document.createElement('div')
                div.classList.add('photo')

                div.onclick = PhotosUpload.removePhoto

                div.appendChild(image)

                div.appendChild(PhotosUpload.getRemoveButton())

        return div
    },
    getRemoveButton() {

        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button


    },
    removePhoto(event) {

        const photoDiv = event.target.parentNode
        const photosArray = Array.from(PhotosUpload.preview.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUpload.files.splice(index, 1)
        PhotosUpload.input.files = PhotosUpload.getAllFiles()

        photoDiv.remove()
    },
    removeOldPhoto(event) {
        const photoDiv = event.target.parentNode

        if(photoDiv.id) {

            const removedFiles = document.querySelector('input[name="removed_files"')
            if(removedFiles) {

                removedFiles.value += `${photoDiv.id},`
            }
        }


        photoDiv.remove()

    }


}


const PhotosUploadChef = {
    input: "",
    preview:  document.querySelector('#photos-preview'),
    uploadLimit: 1,
    files: [],
    handleFileInput(event) {

        const {files: fileList} = event.target
        PhotosUploadChef.input = event.target

        if(PhotosUploadChef.hasLimit(event)) return
        

        Array.from(fileList).forEach(file => {

            PhotosUploadChef.files.push(file)

            const reader = new FileReader()

            reader.onload = () => {

                const image = new Image ()
                image.src = String(reader.result)

                const div = PhotosUploadChef.getContainer(image)

                PhotosUploadChef.preview.appendChild(div)



            }

            reader.readAsDataURL(file)


        })

        PhotosUploadChef.input.files = PhotosUploadChef.getAllFiles()

    },
    hasLimit(event) {

        const {uploadLimit, input, preview} = PhotosUploadChef
        const { files: fileList} = input

        if(fileList.length > uploadLimit) {

            alert(`Envie no máximo ${uploadLimit} foto`)
            event.preventDefault()
            return true

        }

        const photosDiv = []
        preview.childNodes.forEach(item => {

            if(item.classList && item.classList.value == "photo")
            photosDiv.push(item)

        })

        const totalPhotos = fileList.length + photosDiv.length

        if(totalPhotos > uploadLimit) {

            alert("Você atingiu o limite máximo de fotos")
            event.preventDefault()
            return true
        }

        return false

    },
    getAllFiles() {

        const dataTransfer = new ClipboardEvent("").clipboardData || new DataTransfer()

        PhotosUploadChef.files.forEach(file => dataTransfer.items.add(file))

        return dataTransfer.files

    },
    getContainer(image) {

        const div = document.createElement('div')
                div.classList.add('photo')

                div.onclick = PhotosUploadChef.removePhoto

                div.appendChild(image)

                div.appendChild(PhotosUploadChef.getRemoveButton())

        return div
    },
    getRemoveButton() {

        const button = document.createElement('i')
        button.classList.add('material-icons')
        button.innerHTML = "close"
        return button


    },
    removePhoto(event) {

        const photoDiv = event.target.parentNode
        const photosArray = Array.from(PhotosUploadChef.preview.children)
        const index = photosArray.indexOf(photoDiv)

        PhotosUploadChef.files.splice(index, 1)
        PhotosUploadChef.input.files = PhotosUploadChef.getAllFiles()

        photoDiv.remove()
    },
    removeOldPhoto(event) {
        const photoDiv = event.target.parentNode

        if(photoDiv.id) {

            const removedFiles = document.querySelector('input[name="removed_files"')
            if(removedFiles) {

                removedFiles.value += `${photoDiv.id},`
            }
        }


        photoDiv.remove()

    }


}



const ImageGallery = {
    highlight: document.querySelector('.gallery .highlight > img'),    
    previews: document.querySelectorAll('.gallery-preview img'),
    setImage(e) {
    
        const {target} = e
    
        ImageGallery.previews.forEach(preview => preview.classList.remove('active'))
    
        target.classList.add("active")
    
        ImageGallery.highlight.src = target.src
        Lightbox.image.src = target.src
    
    }
    
    }
    
    const Lightbox = {
    target: document.querySelector('.lightbox-target'),
    image: document.querySelector('.lightbox-target img'),
    closeButton: document.querySelector('.lightbox-target a.lightbox-close'),
    open() {
    
        Lightbox.target.style.opacity = 1
        Lightbox.target.style.top= 0
        Lightbox.target.style.bottom= 0
        Lightbox.closeButton.style.top= 0
    
    },
    close() {
    
        Lightbox.target.style.opacity = 0
        Lightbox.target.style.top= "-100%"
        Lightbox.target.style.bottom= "initial"
        Lightbox.closeButton.style.top= "-80px"
    
    
    }
    
    }


    const Validate = {
        apply(input, func) {
            Validate.clearError(input)
    
                let results = Validate[func](input.value)
                input.value = results.value
    
                if(results.error)
                Validate.displayError(input, results.error)
    
        },
        displayError(input, error) {
            const div = document.createElement('div')
            div.classList.add('error')
            div.innerHTML = error
            input.parentNode.appendChild(div)
            input.focus()
        },
        clearError(input) {
            const errorDiv = input.parentNode.querySelector('.error')
            if(errorDiv)
            errorDiv.remove()
        },
        isEmail(value) {
            let error = null
    
            const mailFormat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ 
    
            if (!value.match(mailFormat))
            error= "Email inválido"
    
            return {
                error,
                value
            }
        }
      
    }

    function isadmins(input) {

        if(input.checked) {
            input.value = true
        }         
    }
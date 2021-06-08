<template>
    <div class="gallery-wrapper">
        <div v-if="loading">
            <div class="backdrop">
                <Loading />
            </div>
        </div>
        <div v-else>
            <template v-if="addLoading">
                <div class="backdrop">
                    <Loading />
                </div>
            </template>
            <nav id="nav-pagination">
                <ul class="pagination">
                    <li class="page-item">
                        <button type="button" class="page-link" v-if="page > 1" @click="page = 1"> First </button>
                    </li>
                    <li class="page-item">
                        <button type="button" class="page-link" v-if="page != 1" @click="page--"> Previous </button>
                    </li>
                    ...
                    <li class="page-item hidden-desktop">
                        <template v-for="pageNumber in pages.slice(page-1, page+5)" :key="pageNumber">
                            <button type="button" class="page-link" :class="{active:pageNumber === page}" @click="page = pageNumber"> {{pageNumber}} </button>
                        </template>
                    </li>
                    <li class="page-item hidden-mobile">
                        <template v-for="pageNumber in pages.slice(page-1, page+2)" :key="pageNumber">
                            <button type="button" class="page-link" :class="{active:pageNumber === page}" @click="page = pageNumber"> {{pageNumber}} </button>
                        </template>
                    </li>...
                    <li class="page-item">
                        <button type="button" @click="page++" v-if="page < pages.length" class="page-link"> Next </button>
                    </li>
                    <li class="page-item">
                        <button type="button" class="page-link" v-if="page < pages.length" @click="page = pages.length"> Last </button>
                    </li>
                </ul>
            </nav>
            <template class="image-wrapper" v-for="gallery in galleries" :key="gallery.id">
                <div v-if="gallery.albumId === page" class="image-container">
                    <div class="image">
                        <img :src="gallery.url">
                        <p>{{gallery.title}}</p>
                    </div>
                    <template v-if="isLoggedIn">
                        <button type="button" class="add-collection" @click="addPhotos(gallery)">Add To Collection</button>
                    </template>
                </div>
            </template>
        </div>
    </div>
</template>

<script>
import Loading from '../components/Loading'

export default {
    components: {
        Loading
    },
    data() {
        return {
            galleries: [],
            loading: true,
            pages: [],
            page: 1,
            isLoggedIn: false,
            addLoading: false
        }       
    },
    async mounted() {
        let response = await fetch("https://jsonplaceholder.typicode.com/photos");
        let data = await response.json();
        await this.pages.push(1)
        
        for (let i = 0; i < data.length; i++) {
            if (data[i].albumId > 1) {
                if (data[i].albumId !== data[i - 1].albumId) this.pages.push(data[i].albumId)
            }
            this.galleries.push(data[i])
        }

        const token = localStorage.getItem("token")
        if (token) {
            response = await fetch("https://express-api-bumiai.herokuapp.com/api/users/", {
                headers: {
                    Authorization: "Bearer " + JSON.parse(localStorage.getItem("token")).token
                }
            });
            data = await response.json();
            if (data.success) this.isLoggedIn = true;
        }
        this.loading = false;
    },
    methods: {
        async addPhotos(gallery) {
            this.addLoading = true
            this.ajaxRequest = true
            const userLogin = JSON.parse(localStorage.getItem("token"))
            gallery.userId = userLogin.userid
            const requestOptions = {
                method: "POST",
                headers: { 
                    "Content-Type": "application/json", 
                    Authorization: "Bearer " + userLogin.token
                },
                body: JSON.stringify({gallery})
            };
            const response = await fetch("https://express-api-bumiai.herokuapp.com/api/gallery/add-gallery", requestOptions);
            const data = await response.json();
            if (data.success) {
                alert("berhasil menambah foto ke gallery");
            } else {
                alert(data.message)
            }
            this.addLoading = false
        }
    }
}
</script>

<style>
    .gallery-wrapper #loading {
        height: 75vh;
        width: 80vw;
    } 

    .gallery-wrapper > div {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
        width: 80%;
        margin: 10px auto;
    }

    .image-container {
        min-height: 300px;
        width: 22%;
        min-width: 200px;
        margin: 15px 10px;
        border-style: solid;
        border-width: 1px;
        border-color: #7b7b7b6e;
        border-radius: 5px;
        box-shadow: 1px 1px #7b7b7b;
        padding: 0;
        display: flex;
        justify-content: space-between;
        flex-direction: column;
    }

    .image-container img {
        width: 100%;
        height: auto;
    }

    .image-container p {
        display: -webkit-box;
        overflow: hidden;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
    }

    .image-container button {
        padding: 5px;
        border-style: solid;
        border-radius: 5px;
        border-color: #767676;
        margin: 5px;
    }

    #nav-pagination {
        background-color: inherit;
    }

    .pagination {
        list-style: none;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    #nav-pagination button {
        margin: 2px;
        padding: 3px 10px;
        border-style: solid;
        border-width: 1px;
        border-color: #2b2a2a;
    }

    #nav-pagination button.active {
        background-color: #41b883;
        color: #ffffff;
    }

    .backdrop {
        position: fixed;
        left: 0;
        top: 0;
        z-index: 10001;
        width: 100vw;
        height: 100vh;
        background-color:#72707062
    }

    .hidden-mobile {
        display: none !important;     
    }

    .hidden-desktop {
        display: inline-block !important;
    }

    @media screen and (max-width: 600px) {
        .hidden-mobile {
            display: inline-block !important;
        }
        
        .hidden-desktop {
            display: none !important;
        }
    }
</style>
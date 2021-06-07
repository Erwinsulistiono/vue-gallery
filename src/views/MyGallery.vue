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
            <template v-if="galleries.length == 0">No Data In Your Gallery</template>
            <template v-else>
                <template class="image-wrapper" v-for="gallery in galleries" :key="gallery.id">
                    <div class="image-container">
                        <div class="image">
                            <img :src="gallery.url">
                            <p>{{gallery.title}}</p>
                        </div>
                        <button type="button" class="add-collection" @click="removePhotos(gallery.id)">Remove Photos</button>
                    </div>
                </template>
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
            isLoggedIn: false,
            addLoading: false
        }       
    },
    async mounted() {
        this.isLoggedIn = localStorage.getItem("token") ? true : false
        const token = JSON.parse(localStorage.getItem("token"))
        if (token) {
            const response = await fetch("https://express-api-bumiai.herokuapp.com/api/gallery", {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: "Bearer " + token.token
                },
                method: "POST",
                body: JSON.stringify({id:token.userid})
            });
            const result = await response.json();
            const data = result.data
            if (data) {
                this.galleries = data;
            }
        } else {
            alert("please logged in");
            this.$router.push('/')
        }
        this.loading = false;
    },
    methods: {
        async removePhotos(id) {
            this.ajaxRequest = true
            this.addLoading = true
            const userLogin = JSON.parse(localStorage.getItem("token"))
            const userid = userLogin.userid
            const requestOptions = {
                method: "DELETE",
                headers: { 
                    "Content-Type": "application/json", 
                    Authorization: "Bearer " + userLogin.token
                },
                body: JSON.stringify({id,userid})
            };
            const response = await fetch("https://express-api-bumiai.herokuapp.com/api/gallery/", requestOptions);
            const data = await response.json();
            
            if (data.success) {
                alert("berhasil menghapus foto dari gallery");
                this.galleries = this.galleries.filter(gallery  => gallery.id !== id)
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
</style>
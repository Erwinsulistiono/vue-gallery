<template>
    <div class="form-container">
        <form>
            <div class="input-container">
                <label>Username : </label>
                <input type="text" placeholder="username" v-model="username">
            </div>
            <div class="input-container">
                <label>Password : </label>
                <input type="password" placeholder="password" v-model="password">
            </div>
            <template v-if="ajaxRequest">
                <button type="button" disabled>
                    <Loading />
                </button>
            </template>
            <template v-else>
                <button type="button" @click="register">
                    Daftar
                </button>
            </template>
        </form>
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
            username: '',
            password: '',
            ajaxRequest: false,
            postResults: []
        }
    },
    methods: {
        async register() {
            this.ajaxRequest = true
            const requestOptions = {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    username: this.username,
                    password: this.password
                })
            };
            const response = await fetch("https://express-api-bumiai.herokuapp.com/api/users/", requestOptions);
            const data = await response.json();

            if (data.success) {
                this.$router.push('/login');
            } else {
                alert(data.data);
            }
            this.ajaxRequest = false;
        }
    }
}
</script>

<style>
    .form-container {
        width: 30%;
        min-width: 320px;
        margin: 0 auto;
        padding: 20px;
        border-style: solid;
        border-radius: 5px;
        border-width: 1px;
        border-color: #7b7b7b6e;
        box-shadow: 1px 1px #7b7b7b;
        display: flex;
        flex-direction: column;
    }

    .input-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        margin: 20px 0;
    }

    .input-container input {
        margin-top: 2px;
        width: 100%;
        height: 30px;
        text-align: left;
        padding: 5px;
    }

    .form-container button {
        display: flex;
        margin-left: auto;
        padding: 5px 15px;
        background-color: #41b883;
        border-style: solid;
        border-width: 1px;
        border-radius: 5px;
        border-color: #7b7b7b;
        color: #ffffff;
    }
</style>
<template>
  <NavBar>
    <template v-slot:home>
      <router-link to="/">Explore</router-link>
    </template>
    <template v-slot:nav>
      <template v-if="isLoggedIn">
        <ul id="user_nav_wrap">
          <li><a href="#">User</a>
            <ul class="dropdown">
              <li><router-link to="/edit-user">Edit</router-link></li>
              <li><router-link to="/logout">Logout</router-link></li>
            </ul>
          </li>
          <li><router-link to="/my-gallery">My Gallery</router-link></li>
        </ul>
      </template>
      <template v-else>
          <router-link to="/login">Login</router-link>
          <router-link to="/sign-up">Sign Up</router-link>
      </template>
    </template>
  </NavBar>
  <router-view @logedout="isLoggedIn = false" @logedin="isLoggedIn = true"/>
</template>

<script>
import NavBar from './components/NavBar.vue'

export default {
  name: 'App',
  components: {NavBar},
  data() {
    return {
      isLoggedIn: false
    }
  },
  methods: {
    loggedOut() {
      this.isLoggedIn = false;
    },
    loggedIn() {
      this.isLoggedIn = true;
    }
  }
}
</script>

<style>
* {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  box-sizing: border-box;
  text-align: center;
  color: #2c3e50;
  margin: 0;
  padding: 0;
}
a:hover, button:hover {
  cursor: pointer;
}

#user_nav_wrap {
  
  position: relative;
}

#user_nav_wrap li {
  display: inline-block;
}

#user_nav_wrap li > ul{
  display: none;
  background-color:#ffffff;
}

#user_nav_wrap ul > li a {
  color: #41b883;
}

#user_nav_wrap:hover li > ul{
  align-items: flex-start;
  width: 250px;
  flex-direction: column;
  display: flex;
  position: absolute;
  left: 0;
}

#user_nav_wrap:hover li > ul > li{
  margin: 10px;
  padding: 5px;
}
</style>

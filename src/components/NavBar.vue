<template>
    <nav id="main-nav">
        <div class="navbar">
            <div>
                <slot name='home'></slot>
            </div>
            <div>
                <slot name='nav'></slot>
            </div>
        </div>
    </nav>
</template>

<style>
    #main-nav {
        background-color: #41b883;
        width: 100%; 
        margin-bottom: 50px;
        box-shadow: 0 -3px 12px #3f3f3fc2;
        position: sticky;
        top: 0;
    }

    .navbar {
        height: 75px;
        width: 80%;
        margin: 0 auto;
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .navbar a {
        text-decoration: none;
        margin: 15px;
        padding: 15px 0px 0px 0px;
        color: #f3f3f3;
        font-weight: 700;
        font-size: 18px;
    }

    .navbar a.router-link-exact-active {
        border-bottom-style: solid;
        border-bottom-width: 2px;
        color: #ffffff;
        font-weight: 900;
    }
</style>
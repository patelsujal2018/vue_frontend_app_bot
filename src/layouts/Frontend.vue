<template>
    <div>
        <nav class="navbar navbar-dark sticky-top bg-dark flex-md-nowrap p-0">
            <a class="navbar-brand col-sm-3 col-md-2 mr-0" href="#">Company name</a>
            <ul class="navbar-nav px-3">
                <li class="nav-item text-nowrap">
                    <a class="nav-link" @click="logout()">Logout</a>
                </li>
            </ul>
        </nav>
        <b-container fluid>
            <b-row>
                <div class="col-lg-2 col-md-2 sidebar bg-light">
                    <div class="sidebar-sticky">
                        <ul class="nav flex-column">
                            <li class="nav-item">
                                <router-link :to="{ name: 'home' }" exact class="nav-link">Home</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'settings' }" exact class="nav-link">Settings</router-link>
                            </li>
                            <li class="nav-item">
                                <router-link :to="{ name: 'bot_menu_list' }" exact class="nav-link">Bot Menu List</router-link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="col-lg-10 col-md-10">
                    <router-view></router-view>
                </div>
            </b-row>
        </b-container>
    </div>
</template>

<script>
    export default {
        name:"frontend",
        methods:{
            logout(){
                this.$store.dispatch('auth/logout').then(response=>{
                    if(response.data.success == true){
                        localStorage.removeItem("userdetails");
                        this.$router.push({ name:'login' });
                    }
                }).catch(error=>{
                    console.log(error);
                });
            }
        }
    }
</script>

<style>
    /*
     * Sidebar
     */

    .sidebar {
        /*position: fixed;*/
        top: 0;
        bottom: 0;
        left: 0;
        z-index: 100; /* Behind the navbar */
        padding: 0;
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, .1);
    }

    .sidebar-sticky {
        position: -webkit-sticky;
        position: sticky;
        top: 48px; /* Height of navbar */
        height: calc(100vh - 48px);
        padding-top: .5rem;
        overflow-x: hidden;
        overflow-y: auto; /* Scrollable contents if viewport is shorter than content. */
    }

    .sidebar .nav-link {
        font-weight: 500;
        color: #333;
    }

    .sidebar .nav-link .feather {
        margin-right: 4px;
        color: #999;
    }

    .sidebar .nav-link.active {
        color: #007bff;
    }

    .sidebar .nav-link:hover .feather,
    .sidebar .nav-link.active .feather {
        color: inherit;
    }

    .sidebar-heading {
        font-size: .75rem;
        text-transform: uppercase;
    }

    /*
     * Navbar
     */

    .navbar-brand {
        padding-top: .75rem;
        padding-bottom: .75rem;
        font-size: 1rem;
        background-color: rgba(0, 0, 0, .25);
        box-shadow: inset -1px 0 0 rgba(0, 0, 0, .25);
    }

    .navbar .form-control {
        padding: .75rem 1rem;
        border-width: 0;
        border-radius: 0;
    }

    .form-control-dark {
        color: #fff;
        background-color: rgba(255, 255, 255, .1);
        border-color: rgba(255, 255, 255, .1);
    }

    .form-control-dark:focus {
        border-color: transparent;
        box-shadow: 0 0 0 3px rgba(255, 255, 255, .25);
    }

    /*
     * Utilities
     */

    .border-top { border-top: 1px solid #e5e5e5; }
    .border-bottom { border-bottom: 1px solid #e5e5e5; }
</style>
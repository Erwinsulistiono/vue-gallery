<template>
    <Loading />
</template>

<script>
import Loading from '../components/Loading'
    
export default {
    components: {
        Loading
    },
    mounted() {
        localStorage.removeItem("token")
        this.$emit('logedin');
        this.$router.push('/login');
    }
}
</script>
<template>
    <div id="loading">
        <p>Loading</p><div id="spinner"></div>
    </div>
</template>

<style>
#loading {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: auto;
}

#loading p {
  font-size: 20px;
}

@keyframes spinner {
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
}

#spinner {
  margin-left: 10px;
  min-width: 20px;
  min-height: 20px;
  border: 5px solid rgba(255,255,255,.1);
  border-right: 5px solid #41b883;
  border-radius: 50%;
  animation: spinner 1s linear infinite;
}
</style>
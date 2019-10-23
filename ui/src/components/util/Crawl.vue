
<template>
  <div class="crawl-cont">
    <div class="fade"></div>

    <section class="star-wars">
      <div class="crawl">
        <div class="crawl-title">
          <p>SW Books</p>
          <h1>Welcome!</h1>
        </div>
        <p>Other stuff That is very important to things amongst other things</p>
        <p>Stuff</p>
      </div>
    </section>
  </div>
</template>


<style scoped>
.crawl-cont {
  height: 100vh;
  width: 100%;
}

.fade {
  position: relative;
  width: 100%;
  min-height: 60vh;
  top: -25px;
  background-image: linear-gradient(0deg, transparent, black 75%);
  z-index: 1;
}

.star-wars {
  display: flex;
  justify-content: center;
  position: relative;
  height: 0vh;
  width: 100%;
  color: #feda4a;
  font-family: "Pathway Gothic One", sans-serif;
  font-size: 250%;
  font-weight: 600;
  letter-spacing: 6px;
  line-height: 150%;
  perspective: 400px;
  text-align: justify;
}

.crawl {
  width: 80%;
  position: relative;
  top: 9999px;
  transform-origin: 50% 100%;
  animation: crawl 200s linear;
}

.crawl > .crawl-title {
  font-size: 60%;
  text-align: center;
}

.crawl > .crawl-title h1 {
  margin: 0 0 40px !important;
  text-transform: uppercase;
}

@keyframes crawl {
  0% {
    top: 0;
    transform: rotateX(20deg) translateZ(0);
  }
  100% {
    top: -6000px;
    transform: rotateX(25deg) translateZ(-2500px);
  }
}
</style>

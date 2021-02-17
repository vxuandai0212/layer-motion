<template>
  <div class="__housing__">
    <div class="ground"></div>
    <div class="ground-one"></div>
    <div class="bush bush-one"></div>
    <div class="building-left">
      <div class="top"></div>
    </div>
    <div class="building-right">
      <div class="top"></div>
    </div>
    <div class="building">
      <div class="top"></div>
      <div v-for="index in 8" :key="index" class="window"></div>
    </div>
    <div class="bush bush-two"></div>
    <div class="bush bush-three"></div>
    <div class="bush stem-one">
      <div class="leaves-one"></div>
      <div class="leaves-two"></div>
      <div class="branch"></div>
    </div>
    <div class="stem-two"></div>
    <div class="balloon">
      <div class="base"></div>
      <div class="head"></div>
    </div>
  </div>
</template>
<script>
import anime from 'animejs'
export default {
  name: 'HousingAnimation',
  mounted() {
    let tl = anime.timeline({
      duration: 3000,
      easing: 'linear',
			loop: true
    })
    tl.add({
      targets: '.__housing__, .balloon',
      keyframes: [{ translateY: 0 }, { translateY: 10 }, { translateY: 0 }]
		})
		tl.add({
			targets: '.ground',
			width: [
				{ value: 0, duration: 0 },
				{ value: 300, duration: 1000 },
				{ value: 300, duration: 2000 }
			]
		}, '-=3000')
		tl.add({
			targets: '.ground-one',
			width: [
				{ value: 0, duration: 0 },
				{ value: 40, duration: 1000 },
				{ value: 40, duration: 2000 }
			]
		}, '-=3000')
		tl.add({
			targets: '.building-left',
			height: [
				{ value: 0, duration: 0 },
				{ value: 120, duration: 1000 },
				{ value: 120, duration: 2000 }
			]
		}, '-=3000')
		tl.add({
			targets: '.building-left .top, .building-right .top',
			width: [
				{ value: 0, duration: 0 },
				{ value: 70, duration: 1000 },
				{ value: 70, duration: 2000 }
			]
		}, '-=3000')
		tl.add({
			targets: '.building',
			height: [
				{ value: 0, duration: 0 },
				{ value: 200, duration: 1000 },
				{ value: 200, duration: 2000 }
			]
		}, '-=3000')
		tl.add({
			targets: '.building .top',
			width: [
				{ value: 0, duration: 0 },
				{ value: 106, duration: 1000 },
				{ value: 106, duration: 2000 }
			]
		}, '-=3000')
		tl.add({
			targets: '.window',
			width: [
				{ value: 0, duration: 0 },
				{ value: 30, duration: 1000 },
				{ value: 30, duration: 2000 }
			]
		}, '-=3000')
		tl.add({
			targets: '.building-right',
			height: [
				{ value: 0, duration: 0 },
				{ value: 160, duration: 1000 },
				{ value: 160, duration: 2000 }
			]
		}, '-=3000')
		tl.add({
			targets: '.bush',
			scale: [
				{ value: 0, duration: 0 },
				{ value: 1, duration: 1000 },
				{ value: 1, duration: 2000 }
			]
		}, '-=3000')
  }
}
</script>
<style lang="scss" scoped>
$ground: #7548d6;
$window: lighten(#d3b57e, 20%);
$side-build: #e8dcf9;
$back: #f6f5fe;
$bush: #5adda0;
$balloon: #df96f6;
.__housing__ {
  height: 500px;
  width: 500px;
  margin: auto;
  margin-top: 50px;
  position: relative;
  background: $back;
  border-radius: 50%;
  .ground {
    border: 3px solid $ground;
    position: absolute;
    top: 350px;
    left: 100px;
    border-radius: 5px;
  }
	.ground-one {
		border: 2px solid $ground;
		position: absolute;
		top: 380px;
		left: 130px;
		border-radius: 5px;
	}
	.building-left {
		width: 60px;
		border-left: 3px solid $side-build;
		position: absolute;
		top: 230px;
		left: 140px;
		background: $side-build;
		.top {
			border: 2px solid $side-build;
			position: absolute;
			top: -2px;
			left: -13px;
			border-radius: 5px;
		}
	}
	.building {
		width: 75px;
		border: 3px solid $ground;
		border-bottom: none;
		border-top: none;
		position: absolute;
		top: 150px;
		left: 200px;
		.top {
			border: 2px solid $ground;
			position: absolute;
			top: -2px;
			left: -17px;
			border-radius: 5px;
		}
	}
	@for $i from 1 through 8 {
		.window:nth-child(#{$i+1}) {
			height: 7px;
			border: 2px solid $ground;
			background: $window;
			position: absolute;
			border-radius: 2px;
			@if $i % 2 == 0 {
				top: $i * 20px;
  			right: 21px;
			} @else {
				top: $i * 20px;
  			left: 20px;
			}
		}
	}
	.building-right {
		width: 60px;
		border-left: 3px solid $side-build;
		position: absolute;
		top: 190px;
		right: 160px;
		background: $side-build;
		.top {
			border: 2px solid $side-build;
			position: absolute;
			top: -2px;
			right: -11px;
			border-radius: 5px;
		}
	}
	.bush {
		z-index: 3;
		background: $bush;
		width: 40px;
		height: 20px;
		border-top-left-radius: 40px;
		border-top-right-radius: 40px;
		position: absolute;
		top: 330px;
	}
	.bush-one {
		@extend .bush;
		left: 120px;
	}
	.bush-two {
		@extend .bush;
		right: 160px;
	}
	.bush-three {
		@extend .bush;
		height: 30px;
		top: 320px;
		right: 140px;
	}
	.stem-one {
		height: 60px;
		width: 0;
		border: 2px solid $ground;
		position: absolute;
		top: 280px;
		left: 136px;
		z-index: 2;
		.branch {
			height: 15px;
			width: 0;
			border: 2px solid $ground;
			position: absolute;
			transform: rotate(40deg);
			left: 5px;
			z-index: 2;
		}
		.leaves-one {
			width: 45px;
			height: 45px;
			border-radius: 50%;
			background: $bush;
			position: absolute;
			left: -20px;
			top: -45px;
		}
		.leaves-two {
			width: 35px;
			height: 35px;
			border-radius: 50%;
			background: $bush;
			position: absolute;
			left: -13px;
			top: -60px;
		}
	}
	.balloon {
		width: 75px;
		height: 75px;
		position: absolute;
		top: 60px;
		left: 100px;
		.head {
			width: 40px;
			height: 48px;
			border-radius: 50%;
			position: absolute;
			left: 10px;
			background: $balloon;
		}
		.base {
			width: 7px;
			height: 7px;
			position: absolute;
			top: 47px;
			left: 28px;
			background: $balloon;
		}
	}
}
</style>

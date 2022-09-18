import './Loader.css'
const Loader = ()=>{
    return (
		<>
        <div class="title-container">
		<div class="spinner">
			<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
				<circle cx="50" cy="50" r="46" />
			</svg>
		</div>
		<h1 class="title">Loading...</h1>
	</div>
	<div class="js-loader">
	<div class="js-loader-progress">
	  <div class="more-area">
		<div class="more-circle circle-anime">
		  <div class="js-loader-progress-number">
		  </div>
		  <span class="circle-anime1"></span>
		  <span class="circle-anime2"></span>
		  <span class="circle-anime3"></span>
		</div>
	  </div>
	  <span class="js-loader-border">
	  <div class="js-loader-progress-bar">
	  </div>
	  </span>
	</div>
  </div>
  </>
    )
}
export default Loader
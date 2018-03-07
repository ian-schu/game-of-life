class Demographics {
	constructor(DOMrefManifest) {
		this.populationNowDOM = DOMrefManifest.populationNow;
		this.populationLastDOM = DOMrefManifest.populationLast;
		this.birthRateNowDOM = DOMrefManifest.birthRateNow;
		this.deathRateNowDOM = DOMrefManifest.deathRateNow;
		this.netBirthRateDOM = DOMrefManifest.netBirthRate;
		this.populationNow = 0;
		this.populationLast = 0;
		this.birthRateNow = 0;
		this.deathRateNow = 0;
		this.netBirthRate = 0;
	}

	updateDemographics(demographyData) {
		this.populationNow = demographyData.populationNow;
		this.populationLast = demographyData.populationLast;
		this.birthRateNow = demographyData.birthRateNow;
		this.deathRateNow = demographyData.deathRateNow;
		this.netBirthRate = demographyData.netBirthRate;
		this.renderDemographics();
	}

	renderDemographics() {
		this.populationNowDOM.textContent = this.populationNow;
		this.populationLastDOM.textContent = this.populationLast;
		this.birthRateNowDOM.textContent = this.birthRateNow;
		this.deathRateNowDOM.textContent = this.deathRateNow;
		this.netBirthRateDOM.textContent = this.netBirthRate;
	}
}

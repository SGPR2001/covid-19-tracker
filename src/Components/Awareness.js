import React ,{useState}from "react";
import "./Awareness.css";
import final from "../Images/FINAL_14_03_2020_ENg_page-0001.png"
import protect from "../Images/ProtectivemeasuresEng_page-0001.png"
import distance from "../Images/socialdistancingEnglish_page-0001.png"
import dosdonts from "../Images/Poster_Corona_ad_Eng_page-0001.png"

import travel from "../Images/PostrerEnglishtraveller_page-0001.png"
export default function Awareness() {
    const [language,setLanguage]=useState("English");
    const handleLanguageClick = (language) => {
      setLanguage(language)
    };
  return (
    <div className="awareness">
      <div className="awareness1">
        <div className="part1">
          <h2 className="top-left">Awareness</h2>
          <div className="top-right">
            <button
              onClick={() => handleLanguageClick("English")}
              className={
                language === "English"
                  ? "language-button active"
                  : "language-button"
              }
            >
              English
            </button>
            <button
              onClick={() => handleLanguageClick("Hindi")}
              className={
                language === "Hindi"
                  ? "language-button active"
                  : "language-button"
              }
            >
              Hindi
            </button>
          </div>
        </div>
        <div className="part2">
          {language === "English" && (
            <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <figure>
                    <a
                      href="https://www.mohfw.gov.in/pdf/ProtectivemeasuresEng.pdf"
                      target="_blank"
                    >
                      <img
                        src={protect}
                        alt="Posters for Safety measures against COVID-19 - English"
                      />
                    </a>
                  </figure>
                </div>
                <div class="col-md-4">
                  <figure>
                    <a
                      href="https://www.mohfw.gov.in/pdf/FINAL_14_03_2020_ENg.pdf"
                      target="_blank"
                    >
                      <img
                        src={final}
                        alt="When to get tested for COVID-19 English"
                      />
                    </a>
                  </figure>
                </div>
                <div class="col-md-4">
                  <figure>
                    <a
                      href="https://www.mohfw.gov.in/pdf/socialdistancingEnglish.pdf"
                      target="_blank"
                    >
                      <img
                        src={distance}
                        alt="Poster on Social distancing in a market place during COVID-19 English"
                      />
                    </a>
                  </figure>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <figure>
                    <a
                      href="https://www.mohfw.gov.in/pdf/Poster_Corona_ad_Eng.pdf"
                      target="_blank"
                    >
                      <img
                        src={dosdonts}
                        alt="Do's and Don't Poster in English"
                      />
                    </a>
                  </figure>
                </div>

                <div class="col-md-4">
                  <figure>
                    <a
                      href="https://www.mohfw.gov.in/pdf/PostrerEnglishtraveller.pdf"
                      target="_blank"
                    >
                      <img
                        src={travel}
                        alt="Posters for Indians traveling from abroad - English"
                      />
                    </a>
                  </figure>
                </div>
              </div>
            </div>
          )}
          {language === "Hindi" && (
            <div class="container">
              <div class="row">
                <div class="col-md-4">
                  <figure>
                    <a
                      href="https://www.mohfw.gov.in/pdf/socialdistancingHindi.pdf"
                      target="_blank"
                    >
                      <img
                        src="https://www.mohfw.gov.in/assets/images/socialdistancingHindi_page-0001.png"
                        alt="Poster on Social distancing in a market place during COVID-19 Hindi"
                      />
                    </a>
                  </figure>
                </div>
                <div class="col-md-4">
                  <figure>
                    <a
                      href="https://www.mohfw.gov.in/pdf/FINAL_14_03_2020_Hindi.pdf"
                      target="_blank"
                    >
                      <img
                        src="https://www.mohfw.gov.in/assets/images/FINAL_14_03_2020_Hindi_page-0001.png"
                        alt="When to get tested for COVID-19 Hindi"
                      />
                    </a>
                  </figure>
                </div>
                <div class="col-md-4">
                  <figure>
                    <a
                      href="https://www.mohfw.gov.in/pdf/ProtectivemeasuresHin.pdf"
                      target="_blank"
                    >
                      <img
                        src="https://www.mohfw.gov.in/assets/images/ProtectivemeasuresHin_page-0001.png"
                        alt="Posters for Safety measures against COVID-19 - Hindi"
                      />
                    </a>
                  </figure>
                </div>
              </div>
              <div class="row">
                <div class="col-md-4">
                  <figure>
                    <a
                      href="https://www.mohfw.gov.in/pdf/Poster_Corona_ad_Hin.pdf"
                      target="_blank"
                    >
                      <img
                        src="https://www.mohfw.gov.in/assets/images/Poster_Corona_ad_Hin_page-0001.png"
                        alt="Do's and Don't Poster in English"
                      />
                    </a>
                  </figure>
                </div>

                <div class="col-md-4">
                  <figure>
                    <a
                      href="https://www.mohfw.gov.in/pdf/PosterTravellerHindi.pdf"
                      target="_blank"
                    >
                      <img
                        src="https://www.mohfw.gov.in/assets/images/PosterTravellerHindi_page-0001.png"
                        alt="Posters for Indians traveling from abroad - Hindi"
                      />
                    </a>
                  </figure>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="latest-updates">
        <div class="container">
	<div class="row">
		<div class="col-xs-12">
		<h2>Latest Updates</h2>
		</div>
        <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
			<div class="update-box">
			<p><strong>28.03.2023</strong>
		    <a href="https://www.mohfw.gov.in/pdf/ClinicalGuidanceforManagementofAdultCOVID19Patientsupdatedason05thjan2023.pdf" target="_BLANK"> Clinical Guidance for Management of Adult COVID-19 Patients (updated on 28th March 2023)
			</a></p>
			</div>
			</div>
		<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
			<div class="update-box">
			<p><strong>10.02.2023</strong>
		    <a href="https://www.mohfw.gov.in/pdf/GuidelinesforInternationalArrivals10thFebruary2023.pdf" target="_BLANK"> Guidelines for International Arrivals (updated on 10th February 2023)
			</a></p>
			</div>
			</div>

			<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
			<div class="update-box">
			<p><strong>29.12.2022</strong>
		    <a href="https://www.mohfw.gov.in/pdf/GuidelinesforInternationalArrivals29thDecember2022.pdf" target="_BLANK"> Guidelines for International arrivals (updated on 29th December 2022)
			</a></p>
			</div>
			</div>
				<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
			<div class="update-box">
			<p><strong>17.11.2022</strong>
		    <a href="https://www.mohfw.gov.in/pdf/ListofCountriesinrespectofwhichprimaryvaccinationschedulecompletioncertificateisallowedtobeconsideredason17thNovember2022.pdf" target="_BLANK">  List of Countries/Regions in respect of which primary vaccination schedule completion certificate is allowed to be considered (in context of guidelines for international arrivals updated on 2nd September 2022)
			</a></p>
			</div>
			</div>
		<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
			<div class="update-box">
			<p><strong>21.03.2022</strong>
		    <a href="https://www.mohfw.gov.in/pdf/GuidelinesCovidvaccination12to14yrchildrenMarch2022.pdf" target="_BLANK">  Guidelines for Covid-19 Vaccination of Children Between 12-14 Years of Age 
			</a></p>
			</div>
			</div>

		<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
			<div class="update-box">
			<p><strong>20.01.2022</strong>
		    <a href="https://www.mohfw.gov.in/pdf/RevisedComprehensiveGuidelinesforManagementofCOVID19inChildrenandAdolescentsbelow18years.pdf" target="_BLANK">Revised Comprehensive Guidelines for Management of COVID-19 in Children and Adolescents (below 18 years)
			</a></p>
			</div>
			</div>
		<div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
			<div class="update-box">
			<p><strong>20.01.2022</strong>
		    <a href="https://www.mohfw.gov.in/pdf/RevisedGuidelinesforInternationalArrivaldated20thJanuary2022.pdf" target="_BLANK">Revised Guidelines for International Arrivals dated 20th January 2022
			</a></p>
			</div>
			</div>
	{/* <div class="col-lg-4 col-md-4 col-sm-6 col-xs-12">
			<div class="update-box" >
			<p><strong>17.01.2022</strong>
		    <a href="https://www.mohfw.gov.in/pdf/ClinicalGuidanceforManagementofAdultCovid19Patientsupdatedason17thJanuary2022.pdf" target="_BLANK">Clinical Guidance for Management of Adult Covid-19 Patients (updated as on 17th January 2022) 
			</a></p>
			</div>
			</div> */}
		
		</div>
</div>
      </div>
    </div>
  );
}

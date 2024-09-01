document.addEventListener('DOMContentLoaded', function () {
    const steps = document.querySelectorAll('.step');
    const formSteps = document.querySelectorAll('.form-step');
    const countryInput = document.getElementById('country');
    const titleInput = document.getElementById('proposal-title');
    const detailsInput = document.getElementById('proposal-details');
    const imageInput = document.getElementById('proposal-image');
    const countryList = document.createElement('ul');
    countryList.className = 'country-list';
    countryInput.parentNode.appendChild(countryList);

    const proposalSummary = document.getElementById('proposal-summary');
    const proposalTitleSummary = document.getElementById('proposal-title-summary');
    const proposalDetailsSummary = document.getElementById('proposal-details-summary');
    const proposalLocationSummary = document.getElementById('proposal-location-summary');
    const proposalSubmissionTimeSummary = document.getElementById('proposal-submission-time-summary');
    const proposalImageSummary = document.getElementById('proposal-image-summary');

    const countryCodes = {
        "Afghanistan": "93", "Albania": "355", "Algeria": "213", "Andorra": "376", "Angola": "244",
        "Argentina": "54", "Armenia": "374", "Australia": "61", "Austria": "43", "Azerbaijan": "994",
        "Bahamas": "1-242", "Bahrain": "973", "Bangladesh": "880", "Barbados": "1-246", "Belarus": "375",
        "Belgium": "32", "Belize": "501", "Benin": "229", "Bhutan": "975", "Bolivia": "591",
        "Bosnia and Herzegovina": "387", "Botswana": "267", "Brazil": "55", "Brunei": "673", "Bulgaria": "359",
        "Burkina Faso": "226", "Burundi": "257", "Cabo Verde": "238", "Cambodia": "855", "Cameroon": "237",
        "Canada": "1", "Central African Republic": "236", "Chad": "235", "Chile": "56", "China": "86",
        "Colombia": "57", "Comoros": "269", "Congo": "242", "Costa Rica": "506", "Croatia": "385",
        "Cuba": "53", "Cyprus": "357", "Czech Republic": "420", "Denmark": "45", "Djibouti": "253",
        "Dominica": "1-767", "Dominican Republic": "1-809", "East Timor": "670", "Ecuador": "593", "Egypt": "20",
        "El Salvador": "503", "Equatorial Guinea": "240", "Eritrea": "291", "Estonia": "372", "Eswatini": "268",
        "Ethiopia": "251", "Fiji": "679", "Finland": "358", "France": "33", "Gabon": "241",
        "Gambia": "220", "Georgia": "995", "Germany": "49", "Ghana": "233", "Greece": "30",
        "Grenada": "1-473", "Guatemala": "502", "Guinea": "224", "Guinea-Bissau": "245", "Guyana": "592",
        "Haiti": "509", "Honduras": "504", "Hungary": "36", "Iceland": "354", "India": "91",
        "Indonesia": "62", "Iran": "98", "Iraq": "964", "Ireland": "353", "Israel": "972",
        "Italy": "39", "Ivory Coast": "225", "Jamaica": "1-876", "Japan": "81", "Jordan": "962",
        "Kazakhstan": "7", "Kenya": "254", "Kiribati": "686", "Kosovo": "383", "Kuwait": "965",
        "Kyrgyzstan": "996", "Laos": "856", "Latvia": "371", "Lebanon": "961", "Lesotho": "266",
        "Liberia": "231", "Libya": "218", "Liechtenstein": "423", "Lithuania": "370", "Luxembourg": "352",
        "Madagascar": "261", "Malawi": "265", "Malaysia": "60", "Maldives": "960", "Mali": "223",
        "Malta": "356", "Marshall Islands": "692", "Mauritania": "222", "Mauritius": "230", "Mexico": "52",
        "Micronesia": "691", "Moldova": "373", "Monaco": "377", "Mongolia": "976", "Montenegro": "382",
        "Morocco": "212", "Mozambique": "258", "Myanmar": "95", "Namibia": "264", "Nauru": "674",
        "Nepal": "977", "Netherlands": "31", "New Zealand": "64", "Nicaragua": "505", "Niger": "227",
        "Nigeria": "234", "North Korea": "850", "North Macedonia": "389", "Norway": "47", "Oman": "968",
        "Pakistan": "92", "Palau": "680", "Palestine": "970", "Panama": "507", "Papua New Guinea": "675",
        "Paraguay": "595", "Peru": "51", "Philippines": "63", "Poland": "48", "Portugal": "351",
        "Qatar": "974", "Romania": "40", "Russia": "7", "Rwanda": "250", "Saint Kitts and Nevis": "1-869",
        "Saint Lucia": "1-758", "Saint Vincent and the Grenadines": "1-784", "Samoa": "685", "San Marino": "378",
        "Sao Tome and Principe": "239", "Saudi Arabia": "966", "Senegal": "221", "Serbia": "381",
        "Seychelles": "248", "Sierra Leone": "232", "Singapore": "65", "Slovakia": "421", "Slovenia": "386",
        "Solomon Islands": "677", "Somalia": "252", "South Africa": "27", "South Korea": "82", "South Sudan": "211",
        "Spain": "34", "Sri Lanka": "94", "Sudan": "249", "Suriname": "597", "Sweden": "46",
        "Switzerland": "41", "Syria": "963", "Taiwan": "886", "Tajikistan": "992", "Tanzania": "255",
        "Thailand": "66", "Togo": "228", "Tonga": "676", "Trinidad and Tobago": "1-868", "Tunisia": "216",
        "Turkey": "90", "Turkmenistan": "993", "Tuvalu": "688", "Uganda": "256", "Ukraine": "380",
        "United Arab Emirates": "971", "United Kingdom": "44", "United States": "1", "Uruguay": "598",
        "Uzbekistan": "998", "Vanuatu": "678", "Vatican City": "379", "Venezuela": "58", "Vietnam": "84",
        "Yemen": "967", "Zambia": "260", "Zimbabwe": "263"
    };

    const countries = Object.keys(countryCodes);

    function filterCountries(query) {
        const lowerQuery = query.toLowerCase();
        return countries.filter(country => country.toLowerCase().startsWith(lowerQuery));
    }

    function updateCountryList() {
        const query = countryInput.value;
        countryList.innerHTML = '';
        if (query) {
            const filteredCountries = filterCountries(query);
            filteredCountries.forEach(country => {
                const listItem = document.createElement('li');
                listItem.textContent = country;
                listItem.addEventListener('click', function () {
                    countryInput.value = country;
                    countryList.innerHTML = '';
                });
                countryList.appendChild(listItem);
            });
        }
    }

    function isValidCountry(country) {
        return countries.includes(country);
    }

    function validateCountryInput() {
        const isValid = isValidCountry(countryInput.value);
        if (!isValid) {
            alert('Please enter a valid country from the list.');
            return false;
        }
        return true;
    }

    function validateProposalInput() {
        if (titleInput.value.trim() === '' || detailsInput.value.trim() === '') {
            alert('Please enter a proposal title and details.');
            return false;
        }
        return true;
    }

    function validateImageUpload() {
        if (imageInput.files.length === 0) {
            alert('Please upload an image.');
            return false;
        }
        return true;
    }

    function nextStep(step) {
        if (step === 2 && !validateCountryInput()) {
            return;
        }
        if (step === 3 && !validateProposalInput()) {
            return;
        }
        if (step === 4 && !validateImageUpload()) {
            return;
        }

        formSteps.forEach(stepDiv => stepDiv.style.display = 'none');
        document.getElementById('form-step-' + step).style.display = 'block';

        steps.forEach((stepDiv, index) => {
            if (index + 1 < step) {
                stepDiv.classList.add('completed');
                stepDiv.querySelector('.icon').innerHTML = '<ion-icon name="checkmark-circle-outline"></ion-icon>';
            } else {
                stepDiv.classList.remove('completed');
            }
            stepDiv.classList.remove('active');
        });

        document.getElementById('step-' + step).classList.add('active');

        if (step === 4) {
            const submissionTime = new Date().toLocaleString();
            proposalTitleSummary.textContent = titleInput.value;
            proposalDetailsSummary.textContent = detailsInput.value;
            proposalLocationSummary.textContent = countryInput.value;
            proposalSubmissionTimeSummary.textContent = submissionTime;

            const file = imageInput.files[0];
            let imageSrc = '';
            if (file) {
                const reader = new FileReader();
                reader.onload = function (e) {
                    proposalImageSummary.src = e.target.result;
                    imageSrc = e.target.result;
                };
                reader.readAsDataURL(file);
            }

            const countryCode = countryCodes[countryInput.value] || '000';
            const uniqueId = `PROPOSAL-${countryCode}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
            document.getElementById('proposal-id-summary').textContent = uniqueId;

            // Save proposal to local storage
            const newProposal = {
                id: uniqueId,
                title: titleInput.value,
                details: detailsInput.value,
                location: countryInput.value,
                submissionTime: submissionTime,
                imageSrc: imageSrc
            };

            let proposals = JSON.parse(localStorage.getItem('proposals')) || [];
            proposals.push(newProposal);
            localStorage.setItem('proposals', JSON.stringify(proposals));
        }
    }

    function prevStep(step) {
        nextStep(step);
    }

    function submitProposal(event) {
        event.preventDefault();
        const confettiSettings = { target: 'confetti-canvas', max: 150 };
        const confetti = new ConfettiGenerator(confettiSettings);
        confetti.render();
    
        // Stop confetti after 45 seconds (45000 milliseconds)
        setTimeout(() => {
            confetti.clear();
        }, 5000);
    
        alert('Proposal Submitted Successfully!');
        
    }

    countryInput.addEventListener('input', updateCountryList);
    document.addEventListener('click', function (e) {
        if (!countryInput.contains(e.target)) {
            countryList.innerHTML = '';
        }
    });

    document.getElementById('proposalForm').addEventListener('submit', submitProposal);

    window.nextStep = nextStep;
    window.prevStep = prevStep;
});


function loadProposals() {
    const proposals = JSON.parse(localStorage.getItem('proposals')) || [];
    const proposalsTableBody = document.querySelector('.order tbody');
    proposalsTableBody.innerHTML = ''; // Clear existing rows

    proposals.forEach(proposal => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${proposal.title}</td>
            <td>${new Date(proposal.submissionTime).toLocaleDateString()}</td>
            <td><span class="status pending">Pending</span></td>
        `;
        
        proposalsTableBody.appendChild(row);
    });
}

// Call loadProposals when the page is loaded
document.addEventListener('DOMContentLoaded', loadProposals);

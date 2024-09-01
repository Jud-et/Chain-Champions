const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

allSideMenu.forEach(item=> {
	const li = item.parentElement;

	item.addEventListener('click', function () {
		allSideMenu.forEach(i=> {
			i.parentElement.classList.remove('active');
		})
		li.classList.add('active');
	})
});




// TOGGLE SIDEBAR
const menuBar = document.querySelector('#content nav .bx.bx-menu');
const sidebar = document.getElementById('sidebar');

menuBar.addEventListener('click', function () {
	sidebar.classList.toggle('hide');
})







const searchButton = document.querySelector('#content nav form .form-input button');
const searchButtonIcon = document.querySelector('#content nav form .form-input button .bx');
const searchForm = document.querySelector('#content nav form');

searchButton.addEventListener('click', function (e) {
	if(window.innerWidth < 576) {
		e.preventDefault();
		searchForm.classList.toggle('show');
		if(searchForm.classList.contains('show')) {
			searchButtonIcon.classList.replace('bx-search', 'bx-x');
		} else {
			searchButtonIcon.classList.replace('bx-x', 'bx-search');
		}
	}
})
document.addEventListener('DOMContentLoaded', function () {
    // Initial setup for proposals and profile picture upload
    loadProposals();

    const allSideMenu = document.querySelectorAll('#sidebar .side-menu.top li a');

    allSideMenu.forEach(item => {
        const li = item.parentElement;

        item.addEventListener('click', function () {
            allSideMenu.forEach(i => {
                i.parentElement.classList.remove('active');
            })
            li.classList.add('active');

            if (item.innerText === "My Proposals") {
                loadProposals();
            }
        })
    });

    const uploadImageInput = document.getElementById('upload-image');
    const profileImage = document.getElementById('profileImage');

    uploadImageInput.addEventListener('change', function (event) {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                profileImage.src = e.target.result;
            };
            reader.readAsDataURL(file);
        }
    });
});

function loadProposals() {
    const proposals = JSON.parse(localStorage.getItem('proposals')) || [];
    const proposalsTableBody = document.querySelector('.order tbody');
    const submittedProposalsCount = document.getElementById('submitted-proposals-count');
    const successfulProposalsCount = document.getElementById('successful-proposals-count');
    const tokensEarned = document.querySelector('.bxs-coin-stack').nextElementSibling.querySelector('h3');

    proposalsTableBody.innerHTML = ''; // Clear existing rows

    proposals.forEach((proposal, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${proposal.title}</td>
            <td>${new Date(proposal.submissionTime).toLocaleDateString()}</td>
            <td><span class="status pending">Pending</span></td>
            <td><button class="delete-btn" onclick="deleteProposal(${index})"><i class='bx bxs-trash'></i></button></td>
        `;
        proposalsTableBody.appendChild(row);
    });

    submittedProposalsCount.textContent = proposals.length;
    successfulProposalsCount.textContent = proposals.filter(p => p.status === 'Approved').length;

    setTimeout(() => {
        updateProposalStatus(proposals);
        tokensEarned.textContent = parseInt(tokensEarned.textContent) + 10; // Increase tokens by 10
    }, 60000); // 1 minute delay
}

function deleteProposal(index) {
    let proposals = JSON.parse(localStorage.getItem('proposals')) || [];
    proposals.splice(index, 1); // Remove the selected proposal from the array
    localStorage.setItem('proposals', JSON.stringify(proposals));
    loadProposals(); // Refresh the list
}

function updateProposalStatus(proposals) {
    const successfulProposalsCount = document.getElementById('successful-proposals-count');
    const proposalsTableBody = document.querySelector('.order tbody');

    proposals.forEach(proposal => {
        proposal.status = 'Approved';
    });

    localStorage.setItem('proposals', JSON.stringify(proposals));

    successfulProposalsCount.textContent = proposals.length;

    const rows = proposalsTableBody.querySelectorAll('tr');
    rows.forEach(row => {
        row.querySelector('.status').textContent = 'Pending';
    });
}

// Call loadProposals when the page is loaded
document.addEventListener('DOMContentLoaded', loadProposals);

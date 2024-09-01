document.addEventListener('DOMContentLoaded', function () {
    loadProposals();

    const proposalTableBody = document.getElementById('proposal-table-body');
    const proposalDetailsDiv = document.getElementById('proposal-details');

    // Event delegation for the entire table body
    proposalTableBody.addEventListener('click', function (event) {
        if (event.target.classList.contains('view-btn')) {
            const targetRow = event.target.closest('tr');
            if (targetRow) {
                const proposalId = targetRow.dataset.id;
                const proposal = getProposalById(proposalId);

                displayProposalDetails(proposal);
            }
        }
    });

    function loadProposals() {
        const proposals = JSON.parse(localStorage.getItem('proposals')) || [];
        const proposalTableBody = document.getElementById('proposal-table-body');
        proposalTableBody.innerHTML = ''; // Clear existing rows

        proposals.forEach(proposal => {
            const row = document.createElement('tr');
            row.dataset.id = proposal.id;

            row.innerHTML = `
                <td>${proposal.title}</td>
                <td>${new Date(proposal.submissionTime).toLocaleDateString()}</td>
                <td>${proposal.location}</td>
                <td><button class="btn view-btn">View & Vote</button></td>
            `;

            proposalTableBody.appendChild(row);
        });
    }

    function getProposalById(id) {
        const proposals = JSON.parse(localStorage.getItem('proposals')) || [];
        return proposals.find(proposal => proposal.id === id);
    }

    function displayProposalDetails(proposal) {
        if (proposal) {
            document.getElementById('proposal-id').textContent = proposal.id;
            document.getElementById('proposal-title').textContent = proposal.title;
            document.getElementById('proposal-description').textContent = proposal.details;
            document.getElementById('proposal-location').textContent = proposal.location;
         

            proposalDetailsDiv.style.display = 'block';
        }
    }
});


document.addEventListener('DOMContentLoaded', function () {
    loadProposals();

    const proposalTableBody = document.getElementById('proposal-table-body');
    const proposalDetailsDiv = document.getElementById('proposal-details');
    const voteCountDisplay = document.getElementById('yes-vote-count');
    let yesVoteCount = parseInt(localStorage.getItem('yesVoteCount')) || 0;

    // Initialize Yes Vote Counter
    voteCountDisplay.textContent = yesVoteCount;

    // Modal Elements
    const modal = document.getElementById('voteModal');
    const closeModalBtn = document.querySelector('.modal .close');
    const voteResultMessage = document.getElementById('vote-result-message');

    // Close modal
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Event delegation for the entire table body
    proposalTableBody.addEventListener('click', function (event) {
        if (event.target.classList.contains('view-btn')) {
            const targetRow = event.target.closest('tr');
            if (targetRow) {
                const proposalId = targetRow.dataset.id;
                const proposal = getProposalById(proposalId);

                displayProposalDetails(proposal);
            }
        }
    });

    document.querySelector('.vote-btn').addEventListener('click', function () {
        const selectedVote = document.querySelector('input[name="vote"]:checked').value;

        if (selectedVote === 'yes') {
            yesVoteCount += 1;
            localStorage.setItem('yesVoteCount', yesVoteCount);
            voteCountDisplay.textContent = yesVoteCount;
        }

        voteResultMessage.textContent = `You voted: ${selectedVote}. Yes votes: ${yesVoteCount}`;
        modal.style.display = 'block';
    });

    // Handle delete vote
    document.querySelector('.delete-vote-btn').addEventListener('click', function () {
        const selectedVote = document.querySelector('input[name="vote"]:checked').value;

        if (selectedVote === 'yes' && yesVoteCount > 0) {
            yesVoteCount -= 1;
            localStorage.setItem('yesVoteCount', yesVoteCount);
            voteCountDisplay.textContent = yesVoteCount;
        }

        voteResultMessage.textContent = `Vote deleted. Yes votes: ${yesVoteCount}`;
        modal.style.display = 'block';
    });

    function loadProposals() {
        const proposals = JSON.parse(localStorage.getItem('proposals')) || [];
        const proposalTableBody = document.getElementById('proposal-table-body');
        proposalTableBody.innerHTML = ''; // Clear existing rows

        proposals.forEach(proposal => {
            const row = document.createElement('tr');
            row.dataset.id = proposal.id;

            row.innerHTML = `
                <td>${proposal.title}</td>
                <td>${new Date(proposal.submissionTime).toLocaleDateString()}</td>
                <td>${proposal.location}</td>
                <td><button class="btn view-btn">View & Vote</button></td>
            `;

            proposalTableBody.appendChild(row);
        });
    }

    function getProposalById(id) {
        const proposals = JSON.parse(localStorage.getItem('proposals')) || [];
        return proposals.find(proposal => proposal.id === id);
    }

    function displayProposalDetails(proposal) {
        if (proposal) {
            document.getElementById('proposal-id').textContent = proposal.id;
            document.getElementById('proposal-title').textContent = proposal.title;
            document.getElementById('proposal-description').textContent = proposal.details;
            document.getElementById('proposal-location').textContent = proposal.location;

            proposalDetailsDiv.style.display = 'block';
        }
    }
});

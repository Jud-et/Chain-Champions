document.addEventListener('DOMContentLoaded', function () {
    const proposalList = document.getElementById('proposal-list');
    const proposalDetailsSection = document.getElementById('proposal-details');

    function showProposalDetails(id, title, details, location, imageSrc) {
        document.getElementById('proposal-id').textContent = id;
        document.getElementById('proposal-title').textContent = title;
        document.getElementById('proposal-details').textContent = details;
        document.getElementById('proposal-location').textContent = location;
        document.getElementById('proposal-image').src = imageSrc;

        // Show the details section
        proposalDetailsSection.style.display = 'block';
    }

    function populateProposalList(proposals) {
        proposals.forEach(proposal => {
            const listItem = document.createElement('li');
            listItem.textContent = `${proposal.title}`;
            listItem.onclick = function () {
                showProposalDetails(proposal.id, proposal.title, proposal.details, proposal.location, proposal.image);
            };
            proposalList.appendChild(listItem);
        });
    }

    // Sample data for proposals - In real implementation, this data could be fetched from a server
    const sampleProposals = [
        { id: 'PROPOSAL-254-ABC123', title: '', details: 'A proposal to increase the use of solar energy in residential areas.', location: 'Nairobi, Kenya', image: 'proposal-image.jpg' },
        { id: 'PROPOSAL-254-DEF456', title: 'Ut', details: 'Expanding community gardens across the city.', location: 'Kisumu, Kenya', image: 'gardening-image.jpg' }
    ];

    populateProposalList(sampleProposals);

    function vote(option) {
        alert(`You voted: ${option}`);
        // Logic to handle voting could be added here, like sending data to a server or updating the UI
    }

    document.getElementById('poll-yes').addEventListener('click', function () {
        vote('Yes');
    });
    document.getElementById('poll-no').addEventListener('click', function () {
        vote('No');
    });
    document.getElementById('poll-unsure').addEventListener('click', function () {
        vote('Not Sure');
    });
});

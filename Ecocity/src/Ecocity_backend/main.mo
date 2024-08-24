import HashMap "mo:base/HashMap";
import Principal "mo:base/Principal";
import Nat "mo:base/Nat";
import List "mo:base/List";
import Time "mo:base/Time";
import Iter "mo:base/Iter";
import Hash "mo:base/Hash";
import Text "mo:base/Text";

actor EcoCity {
    type UserId = Principal;
    type ProposalId = Nat;

    type User = {
        name: Text;
        proposals: List.List<ProposalId>;
        votedProposals: List.List<ProposalId>;
        tokens: Nat;
    };

    type Proposal = {
        id: ProposalId;
        title: Text;
        description: Text;
        author: UserId;
        votes: Int;
        createdAt: Time.Time;
    };

    private func natHash(n: Nat): Hash.Hash {
        Text.hash(Nat.toText(n))
    };

    private stable var nextProposalId : Nat = 0;
    private let users : HashMap.HashMap<UserId, User> = HashMap.HashMap<UserId, User>(10, Principal.equal, Principal.hash);
    private let proposals : HashMap.HashMap<ProposalId, Proposal> = HashMap.HashMap<ProposalId, Proposal>(10, Nat.equal, natHash);

    // User Management
    public shared(msg) func createUser(name : Text) : async () {
        let userId = msg.caller;
        let newUser : User = {
            name = name;
            proposals = List.nil<ProposalId>();
            votedProposals = List.nil<ProposalId>();
            tokens = 100; // Start with 100 tokens
        };
        users.put(userId, newUser);
    };

    public query func getUser(userId : UserId) : async ?User {
        users.get(userId)
    };

    // Proposal Management
    public shared(msg) func createProposal(title : Text, description : Text) : async ProposalId {
        let author = msg.caller;
        let proposalId = nextProposalId;
        nextProposalId += 1;

        let newProposal : Proposal = {
            id = proposalId;
            title = title;
            description = description;
            author = author;
            votes = 0;
            createdAt = Time.now();
        };

        proposals.put(proposalId, newProposal);

        switch (users.get(author)) {
            case (null) { /* Handle error */ };
            case (?user) {
                let updatedUser = {
                    name = user.name;
                    proposals = List.push(proposalId, user.proposals);
                    votedProposals = user.votedProposals;
                    tokens = user.tokens;
                };
                users.put(author, updatedUser);
            };
        };

        proposalId
    };

    public query func getProposal(proposalId : ProposalId) : async ?Proposal {
        proposals.get(proposalId)
    };

    // Voting
    public shared(msg) func voteOnProposal(proposalId : ProposalId, voteValue : Int) : async Bool {
        let voter = msg.caller;
        switch (users.get(voter), proposals.get(proposalId)) {
            case (?user, ?proposal) {
                if (List.some(user.votedProposals, func (id: ProposalId) : Bool { id == proposalId })) {
                    return false; // User has already voted
                };

                let updatedProposal = {
                    id = proposal.id;
                    title = proposal.title;
                    description = proposal.description;
                    author = proposal.author;
                    votes = proposal.votes + voteValue;
                    createdAt = proposal.createdAt;
                };
                proposals.put(proposalId, updatedProposal);

                let updatedUser = {
                    name = user.name;
                    proposals = user.proposals;
                    votedProposals = List.push(proposalId, user.votedProposals);
                    tokens = user.tokens + 1; // Reward token for voting
                };
                users.put(voter, updatedUser);

                true
            };
            case _ { false };
        }
    };

    // Helper functions
    public query func getAllProposals() : async [(ProposalId, Proposal)] {
        Iter.toArray(proposals.entries())
    };

    public query func getUserProposals(userId : UserId) : async [ProposalId] {
        switch (users.get(userId)) {
            case (null) { [] };
            case (?user) { List.toArray(user.proposals) };
        }
    };
}
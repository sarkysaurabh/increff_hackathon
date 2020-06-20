package hackathon.model;

public class NotificationRequest {
    private String lendersEmail;
    private String borrowersEmail;
    private String postId;

    public String getLendersEmail() {
        return lendersEmail;
    }

    public void setLendersEmail(String lendersEmail) {
        this.lendersEmail = lendersEmail;
    }

    public String getBorrowersEmail() {
        return borrowersEmail;
    }

    public void setBorrowersEmail(String borrowersEmail) {
        this.borrowersEmail = borrowersEmail;
    }

    public String getPostId() {
        return postId;
    }

    public void setPostId(String postId) {
        this.postId = postId;
    }
}

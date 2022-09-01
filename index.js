class Letter {
  async getPosts() {
    return await fetch("https://jsonplaceholder.typicode.com/posts");
  }

  async getUsers() {
    return await fetch("https://jsonplaceholder.typicode.com/users");
  }

  async get() {
    try {
      const postsResponse = await this.getPosts();
      const posts = await postsResponse.json();
      const usersResponse = await this.getUsers();
      const users = await usersResponse.json();
      const response = users.map((user) => {
        const postsFiltered = posts.filter((post) => post.userId === user.id);
        return { ...user, posts: postsFiltered };
      });
      return response;
    } catch (e) {
      console.log(e);
      return new Error("Error when performing requests");
    }
  }
}

const main = async () => {
  const letter = new Letter();
  const letterResponse = await letter.get();
  console.table(letterResponse);
};

main();

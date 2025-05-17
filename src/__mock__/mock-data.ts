export const mockBoards = {
  data: [
    {
      id: 1,
      name: "Action",
    },
    {
      id: 2,
      name: "Adventure",
    },
    {
      id: 3,
      name: "Comedy",
    },
    {
      id: 4,
      name: "Horror",
    },
  ],
  status: 200,
}

export const mockGenres = {
  data: [
    {
      id: 1,
      name: "Action",
      slug: "action",
    },
    {
      id: 2,
      name: "Adventure",
      slug: "adventure",
    },
    {
      id: 3,
      name: "Comedy",
      slug: "comedy",
    },
    {
      id: 4,
      name: "Horror",
      slug: "horror",
    },
  ],
  status: 200,
}

export const mockFavoriteGenres = {
  data: [
    "Action",
    "Adventure",
    "Comedy"
  ],
  status: 200,
}

export const mockPosts = { 
  data: [
    {
      "image": null,
      "deleted": 0,
      "rating": 0,
      "id": 5,
      "text": "content is funny",
      "title": "This is a test post about an action movie",
      "username": "fadelafuente",
      "has_spoiler": 0
    },
    {
      "image": null,
      "deleted": 0,
      "rating": 0,
      "id": 6,
      "text": "content is funny",
      "title": "This is a test post about an action movie",
      "username": "fadelafuente",
      "has_spoiler": 1
    },
  ],
  status: 200
}

export const mockMovies = {
  data: [
    {
      id: 1,
      title: "The Dark Knight",
    },
    {
      id: 2,
      title: "Inception",
    },
    {
      id: 3,
      title: "Interstellar",
    },
    {
      id: 4,
      title: "The Matrix",
    },
  ],
  status: 200
}
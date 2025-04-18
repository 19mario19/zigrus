const data = {
  movies: [
    {
      id: 0,
      title: "Matrix",
      subtitle: "The First",
      year: 1999,
      category: "Action",
      promote: true,
      rating: 3,
    },
    {
      id: 1,
      title: "Harry Potter",
      year: 2000,
      category: "Fantasy",
      promote: true,
      rating: 5,
      episodes: [
        {
          id: 1,
          title: "The Sorcerer's Stone",
          year: 2000,
          rating: 4,
        },
        {
          id: 2,
          title: "The Chamber of Secrets",
          year: 2002,
          rating: 2,
        },
      ],
    },
    {
      id: 2,
      title: "Inception",
      subtitle: "Dream within a dream",
      year: 2010,
      category: "Sci-Fi",
      rating: 5,
    },
    {
      id: 3,
      title: "The Dark Knight",
      subtitle: "Rise of the Joker",
      year: 2008,
      category: "Action",
      rating: 5,
    },
    {
      id: 4,
      title: "Interstellar",
      subtitle: "Beyond the Stars",
      year: 2014,
      category: "Sci-Fi",
      rating: 4,
    },
    {
      id: 5,
      title: "The Lord of the Rings",
      year: 2001,
      category: "Fantasy",
      rating: 5,
      episodes: [
        {
          id: 1,
          title: "The Fellowship of the Ring",
          year: 2001,
          rating: 5,
        },
        {
          id: 2,
          title: "The Two Towers",
          year: 2002,
          rating: 3,
        },
        {
          id: 3,
          title: "The Return of the King",
          year: 2003,
          rating: 5,
        },
      ],
    },
    {
      id: 6,
      title: "Titanic",
      subtitle: "A Tragic Love Story",
      year: 1997,
      category: "Romance",
      rating: 1,
    },
    {
      id: 7,
      title: "The Godfather",
      subtitle: "Crime and Power",
      year: 1972,
      category: "Crime",
      rating: 5,
    },
    {
      id: 8,
      title: "Pulp Fiction",
      subtitle: "Tarantino Classic",
      year: 1994,
      category: "Crime",
      rating: 4,
    },
    {
      id: 9,
      title: "Gladiator",
      subtitle: "Are You Not Entertained?",
      year: 2000,
      category: "Historical",
      rating: 4,
    },
    {
      id: 10,
      title: "Avengers",
      year: 2012,
      category: "Superhero",
      rating: 4,
      episodes: [
        {
          id: 1,
          title: "The Avengers",
          year: 2012,
          rating: 5,
        },
        {
          id: 2,
          title: "Age of Ultron",
          year: 2015,
          rating: 3,
        },
        {
          id: 3,
          title: "Infinity War",
          year: 2018,
          rating: 5,
        },
        {
          id: 4,
          title: "Endgame",
          year: 2019,
          rating: 2,
        },
      ],
    },
    {
      id: 11,
      title: "The Lion King",
      subtitle: "A Disney Classic",
      year: 1994,
      category: "Animation",
      rating: 5,
    },
    {
      id: 12,
      title: "The Shawshank Redemption",
      subtitle: "Hope and Freedom",
      year: 1994,
      category: "Drama",
      rating: 5,
    },
    {
      id: 13,
      title: "Forrest Gump",
      subtitle: "Life is Like a Box of Chocolates",
      year: 1994,
      category: "Drama",
      rating: 4,
    },
    {
      id: 14,
      title: "The Matrix Reloaded",
      subtitle: "The Second Chapter",
      year: 2003,
      category: "Action",
      rating: 3,
    },
    {
      id: 15,
      title: "The Matrix Revolutions",
      subtitle: "End of the War",
      year: 2003,
      category: "Action",
      rating: 1,
    },
    {
      id: 16,
      title: "Spider-Man",
      year: 2002,
      category: "Superhero",
      rating: 4,
      episodes: [
        {
          id: 1,
          title: "Spider-Man",
          year: 2002,
          rating: 5,
        },
        {
          id: 2,
          title: "Spider-Man 2",
          year: 2004,
          rating: 5,
        },
        {
          id: 3,
          title: "Spider-Man 3",
          year: 2007,
          rating: 2,
        },
      ],
    },
    {
      id: 17,
      title: "Jurassic Park",
      subtitle: "Dinosaurs Return",
      year: 1993,
      category: "Adventure",
      rating: 4,
    },
    {
      id: 18,
      title: "Avatar",
      subtitle: "The World of Pandora",
      year: 2009,
      category: "Sci-Fi",
      rating: 3,
    },
    {
      id: 19,
      title: "The Silence of the Lambs",
      subtitle: "Horror and Suspense",
      year: 1991,
      category: "Thriller",
      rating: 5,
    },
    {
      id: 20,
      title: "The Best Movie",
      subtitle: "The Beast of All",
      year: 1997,
      category: "Comedy",
      rating: 5,
    },
    {
      id: 21,
      title: "The Best Movie 2",
      subtitle: "The Beast of All",
      year: 1999,
      category: "Comedy",
      rating: 5,
    },
  ],

  "tv-series": [
    {
      id: 0,
      title: "Breaking Bad",
      year: 2008,
      category: "Drama",
      promote: true,
      rating: 5,
      seasons: [
        {
          id: 1,
          year: 2008,
          episodes: 7,
          rating: 4,
        },
        {
          id: 2,
          year: 2009,
          episodes: 13,
          rating: 5,
        },
      ],
    },
    {
      id: 1,
      title: "Stranger Things",
      year: 2016,
      category: "Sci-Fi",
      promote: true,
      rating: 4,
      seasons: [
        {
          id: 1,
          year: 2016,
          episodes: 8,
          rating: 5,
        },
        {
          id: 2,
          year: 2017,
          episodes: 9,
          rating: 3,
        },
      ],
    },
    {
      id: 2,
      title: "Brave New World",
      subtitle: "Dystopian Future",
      promote: true,
      year: 2020,
      category: "Sci-Fi",
      rating: 2,
    },
  ],
  books: [
    {
      id: 0,
      title: "1984",
      author: "George Orwell",
      year: 1949,
      category: "Dystopian",
      promote: true,
      rating: 5,
    },
    {
      id: 1,
      title: "Dune",
      author: "Frank Herbert",
      year: 1965,
      category: "Sci-Fi",
      rating: 4,
    },
    {
      id: 3,
      title: "Pride and Prejudice",
      author: "Jane Austen",
      year: 1813,
      category: "Classic",
      rating: 3,
    },
    {
      id: 4,
      title: "The Hitchhiker's Guide to the Galaxy",
      author: "Douglas Adams",
      year: 1979,
      category: "Sci-Fi",
      rating: 5,
    },
    {
      id: 5,
      title: "To Kill a Mockingbird",
      author: "Harper Lee",
      year: 1960,
      category: "Classic",
      rating: 5,
    },
    {
      id: 6,
      title: "Harry Potter and the Sorcerer's Stone",
      author: "J.K. Rowling",
      year: 1997,
      category: "Fantasy",
      rating: 4,
    },
    {
      id: 7,
      title: "The Catcher in the Rye",
      author: "J.D. Salinger",
      year: 1951,
      category: "Classic",
      rating: 1,
    },
    {
      id: 8,
      title: "The Martian",
      author: "Andy Weir",
      year: 2011,
      category: "Sci-Fi",
      rating: 4,
    },
    {
      id: 9,
      title: "Brave New World",
      author: "Aldous Huxley",
      year: 1932,
      category: "Dystopian",
      rating: 4,
    },
    {
      id: 10,
      title: "The Picture of Dorian Gray",
      author: "Oscar Wilde",
      year: 1890,
      category: "Classic",
      rating: 2,
    },
    {
      id: 11,
      title: "Foundation",
      author: "Isaac Asimov",
      year: 1951,
      category: "Sci-Fi",
      rating: 4,
    },
  ],
  games: [
    {
      id: 0,
      title: "The Last of Us Part II",
      author: "Naughty Dog",
      year: 2020,
      category: "Action-adventure",
      rating: 4,
    },
    {
      id: 1,
      title: "Minecraft",
      author: "Mojang Studios",
      year: 2011,
      category: "Sandbox",
      rating: 5,
    },
    {
      id: 2,
      title: "Grand Theft Auto V",
      author: "Rockstar Games",
      year: 2013,
      category: "Action-adventure",
      rating: 5,
    },
    {
      id: 3,
      title: "Cyberpunk 2077",
      author: "CD Projekt Red",
      year: 2020,
      category: "Action role-playing",
      rating: 3,
    },
    {
      id: 4,
      title: "Death Stranding",
      author: "Kojima Productions",
      year: 2019,
      category: "Action",
      rating: 1,
    },
    {
      id: 5,
      title: "Control",
      author: "Remedy Entertainment",
      year: 2019,
      category: "Action-adventure",
      rating: 4,
    },
    {
      id: 6,
      title: "Disco Elysium",
      author: "ZA/UM",
      year: 2019,
      category: "Role-playing",
      rating: 5,
    },
    {
      id: 7,
      title: "Hades",
      author: "Supergiant Games",
      year: 2020,
      category: "Action roguelike",
      rating: 5,
    },
    {
      id: 8,
      title: "Sekiro: Shadows Die Twice",
      author: "FromSoftware",
      year: 2019,
      category: "Action-adventure",
      rating: 4,
    },
    {
      id: 9,
      title: "Outer Wilds",
      author: "Mobius Digital",
      year: 2019,
      category: "Action-adventure",
      rating: 5,
    },
  ],
}

export { data }

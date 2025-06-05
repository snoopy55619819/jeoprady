-- Create the games table
CREATE TABLE IF NOT EXISTS public.games (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    rounds JSONB NOT NULL
);

-- Enable Row Level Security (RLS)
ALTER TABLE public.games ENABLE ROW LEVEL SECURITY;

-- Create a policy to allow read access to all users
CREATE POLICY "Allow public read access" ON public.games
    FOR SELECT USING (true);

-- Insert sample data
INSERT INTO public.games (name, rounds) VALUES 
('Demo Game', '[
  {
    "name": "Round 1",
    "categories": [
      {
        "name": "Science",
        "questions": [
          { "question": "This gas do plants breathe in", "answer": "What is carbon dioxide?", "value": 200 },
          { "question": "The center of an atom is called this", "answer": "What is the nucleus?", "value": 400 },
          { "question": "This force keeps us on the ground", "answer": "What is gravity?", "value": 600 },
          { "question": "This planet is known as the Red Planet", "answer": "What is Mars?", "value": 800 },
          { "question": "Water boils at this temperature in Celsius", "answer": "What is 100?", "value": 1000 }
        ]
      },
      {
        "name": "History",
        "questions": [
          { "question": "He was the first President of the USA", "answer": "Who is George Washington?", "value": 200 },
          { "question": "This war ended in 1945", "answer": "What is World War II?", "value": 400 },
          { "question": "The Great Wall is in this country", "answer": "What is China?", "value": 600 },
          { "question": "The pyramids were built in this country", "answer": "What is Egypt?", "value": 800 },
          { "question": "This document begins with ''We the People''", "answer": "What is the U.S. Constitution?", "value": 1000 }
        ]
      },
      {
        "name": "Movies",
        "questions": [
          { "question": "This wizard attends Hogwarts", "answer": "Who is Harry Potter?", "value": 200 },
          { "question": "He says ''I am your father''", "answer": "Who is Darth Vader?", "value": 400 },
          { "question": "This ship hit an iceberg", "answer": "What is the Titanic?", "value": 600 },
          { "question": "This clownfish is lost", "answer": "Who is Nemo?", "value": 800 },
          { "question": "This ring must be destroyed in Mordor", "answer": "What is the One Ring?", "value": 1000 }
        ]
      },
      {
        "name": "Geography",
        "questions": [
          { "question": "This is the largest ocean", "answer": "What is the Pacific Ocean?", "value": 200 },
          { "question": "This desert is the largest", "answer": "What is the Sahara Desert?", "value": 400 },
          { "question": "This U.S. state is known as the Sunshine State", "answer": "What is Florida?", "value": 600 },
          { "question": "The capital of France", "answer": "What is Paris?", "value": 800 },
          { "question": "This country has the most islands", "answer": "What is Sweden?", "value": 1000 }
        ]
      },
      {
        "name": "Music",
        "questions": [
          { "question": "He was the King of Pop", "answer": "Who is Michael Jackson?", "value": 200 },
          { "question": "This band sang ''Hey Jude''", "answer": "Who are The Beatles?", "value": 400 },
          { "question": "This musical instrument has black and white keys", "answer": "What is a piano?", "value": 600 },
          { "question": "This singer released ''Shake It Off''", "answer": "Who is Taylor Swift?", "value": 800 },
          { "question": "This composer wrote the 5th Symphony", "answer": "Who is Beethoven?", "value": 1000 }
        ]
      },
      {
        "name": "Food",
        "questions": [
          { "question": "This fruit keeps the doctor away", "answer": "What is an apple?", "value": 200 },
          { "question": "This is made from milk and bacteria", "answer": "What is yogurt?", "value": 400 },
          { "question": "This is the main ingredient in guacamole", "answer": "What is avocado?", "value": 600 },
          { "question": "This Italian dish uses dough and toppings", "answer": "What is pizza?", "value": 800 },
          { "question": "This orange vegetable is good for your eyes", "answer": "What is a carrot?", "value": 1000 }
        ]
      }
    ]
  },
  {
    "name": "Round 2",
    "categories": [
      {
        "name": "Technology",
        "questions": [
          { "question": "This company created the iPhone", "answer": "What is Apple?", "value": 400 },
          { "question": "This language is used for web pages", "answer": "What is HTML?", "value": 800 },
          { "question": "He founded Microsoft", "answer": "Who is Bill Gates?", "value": 1200 },
          { "question": "This tech billionaire owns Tesla", "answer": "Who is Elon Musk?", "value": 1600 },
          { "question": "This search engine is also a verb", "answer": "What is Google?", "value": 2000 }
        ]
      },
      {
        "name": "Literature",
        "questions": [
          { "question": "This author wrote ''1984''", "answer": "Who is George Orwell?", "value": 400 },
          { "question": "He wrote ''Romeo and Juliet''", "answer": "Who is William Shakespeare?", "value": 800 },
          { "question": "This is the first book of the Bible", "answer": "What is Genesis?", "value": 1200 },
          { "question": "This girl falls down a rabbit hole", "answer": "Who is Alice?", "value": 1600 },
          { "question": "This is the author of ''The Hobbit''", "answer": "Who is J.R.R. Tolkien?", "value": 2000 }
        ]
      },
      {
        "name": "Sports",
        "questions": [
          { "question": "This sport uses a bat and a ball", "answer": "What is baseball?", "value": 400 },
          { "question": "He has 23 Grand Slam titles in tennis", "answer": "Who is Novak Djokovic?", "value": 800 },
          { "question": "This game is played on ice with sticks", "answer": "What is hockey?", "value": 1200 },
          { "question": "This event happens every 4 years and has many sports", "answer": "What are the Olympics?", "value": 1600 },
          { "question": "This player is called ''King James''", "answer": "Who is LeBron James?", "value": 2000 }
        ]
      },
      {
        "name": "TV Shows",
        "questions": [
          { "question": "This show features a yellow family", "answer": "What are The Simpsons?", "value": 400 },
          { "question": "This show has dragons and thrones", "answer": "What is Game of Thrones?", "value": 800 },
          { "question": "This show is set in Dunder Mifflin", "answer": "What is The Office?", "value": 1200 },
          { "question": "This is the name of the coffee shop in Friends", "answer": "What is Central Perk?", "value": 1600 },
          { "question": "This show stars a child with psychic powers named Eleven", "answer": "What is Stranger Things?", "value": 2000 }
        ]
      },
      {
        "name": "Animals",
        "questions": [
          { "question": "This is the largest land animal", "answer": "What is an elephant?", "value": 400 },
          { "question": "This bird can mimic human speech", "answer": "What is a parrot?", "value": 800 },
          { "question": "This sea creature has eight legs", "answer": "What is an octopus?", "value": 1200 },
          { "question": "This mammal lays eggs", "answer": "What is a platypus?", "value": 1600 },
          { "question": "This striped animal lives in Africa", "answer": "What is a zebra?", "value": 2000 }
        ]
      },
      {
        "name": "Random Facts",
        "questions": [
          { "question": "This is the tallest mountain in the world", "answer": "What is Mount Everest?", "value": 400 },
          { "question": "This shape has 6 sides", "answer": "What is a hexagon?", "value": 800 },
          { "question": "This element''s symbol is ''O''", "answer": "What is Oxygen?", "value": 1200 },
          { "question": "This month has only 28 or 29 days", "answer": "What is February?", "value": 1600 },
          { "question": "This country has a maple leaf on its flag", "answer": "What is Canada?", "value": 2000 }
        ]
      }
    ]
  },
  {
    "name": "Final Round",
    "category": "World Leaders",
    "question": "He was the first black president of South Africa",
    "answer": "Who is Nelson Mandela?"
  }
]'::jsonb);

-- Add another sample game
INSERT INTO public.games (name, rounds) VALUES 
('Classic Jeopardy', '[
  {
    "name": "Round 1", 
    "categories": [
      {
        "name": "U.S. Presidents",
        "questions": [
          { "question": "This president appears on Mount Rushmore and the penny", "answer": "Who is Abraham Lincoln?", "value": 200 },
          { "question": "He was president during the Louisiana Purchase", "answer": "Who is Thomas Jefferson?", "value": 400 },
          { "question": "This president served the shortest term in office", "answer": "Who is William Henry Harrison?", "value": 600 },
          { "question": "He was the only president to serve non-consecutive terms", "answer": "Who is Grover Cleveland?", "value": 800 },
          { "question": "This president established the Peace Corps", "answer": "Who is John F. Kennedy?", "value": 1000 }
        ]
      },
      {
        "name": "World Capitals",
        "questions": [
          { "question": "This is the capital of Australia", "answer": "What is Canberra?", "value": 200 },
          { "question": "The capital of this country is Bern", "answer": "What is Switzerland?", "value": 400 },
          { "question": "This African capital is known as the ''Pearl of Africa''", "answer": "What is Kampala?", "value": 600 },
          { "question": "This capital city was built specifically to be a capital", "answer": "What is Brasília?", "value": 800 },
          { "question": "This Asian capital was formerly known as Rangoon", "answer": "What is Yangon?", "value": 1000 }
        ]
      },
      {
        "name": "Nobel Prizes",
        "questions": [
          { "question": "She won Nobel Prizes in both Physics and Chemistry", "answer": "Who is Marie Curie?", "value": 200 },
          { "question": "This organization won the Nobel Peace Prize in 1917", "answer": "What is the Red Cross?", "value": 400 },
          { "question": "He won the Nobel Prize for Literature and declined it", "answer": "Who is Jean-Paul Sartre?", "value": 600 },
          { "question": "This president won the Nobel Peace Prize in 2009", "answer": "Who is Barack Obama?", "value": 800 },
          { "question": "The youngest Nobel Prize winner", "answer": "Who is Malala Yousafzai?", "value": 1000 }
        ]
      },
      {
        "name": "Classic Literature",
        "questions": [
          { "question": "This novel begins ''Call me Ishmael''", "answer": "What is Moby Dick?", "value": 200 },
          { "question": "Jane Austen wrote this novel about Elizabeth Bennet", "answer": "What is Pride and Prejudice?", "value": 400 },
          { "question": "This Russian author wrote ''War and Peace''", "answer": "Who is Leo Tolstoy?", "value": 600 },
          { "question": "The protagonist of this novel is named Winston Smith", "answer": "What is 1984?", "value": 800 },
          { "question": "This epic poem tells the story of Odysseus", "answer": "What is The Odyssey?", "value": 1000 }
        ]
      },
      {
        "name": "Space Exploration",
        "questions": [
          { "question": "This was the first artificial satellite", "answer": "What is Sputnik?", "value": 200 },
          { "question": "He was the first person to walk on the moon", "answer": "Who is Neil Armstrong?", "value": 400 },
          { "question": "This space agency landed the Curiosity rover on Mars", "answer": "What is NASA?", "value": 600 },
          { "question": "This spacecraft took the famous ''Pale Blue Dot'' photo", "answer": "What is Voyager 1?", "value": 800 },
          { "question": "The International Space Station orbits at this approximate altitude", "answer": "What is 400 kilometers?", "value": 1000 }
        ]
      },
      {
        "name": "Ancient Civilizations",
        "questions": [
          { "question": "This wonder of the ancient world was located in Alexandria", "answer": "What is the Lighthouse?", "value": 200 },
          { "question": "This empire was ruled by Hammurabi", "answer": "What is Babylon?", "value": 400 },
          { "question": "The Rosetta Stone helped decode this ancient writing", "answer": "What are hieroglyphs?", "value": 600 },
          { "question": "This Mesopotamian city is considered the world''s first", "answer": "What is Ur?", "value": 800 },
          { "question": "This ancient library was the largest in the world", "answer": "What is the Library of Alexandria?", "value": 1000 }
        ]
      }
    ]
  },
  {
    "name": "Round 2",
    "categories": [
      {
        "name": "Modern Technology",
        "questions": [
          { "question": "This social media platform was founded by Mark Zuckerberg", "answer": "What is Facebook?", "value": 400 },
          { "question": "This programming language was created by Guido van Rossum", "answer": "What is Python?", "value": 800 },
          { "question": "This company developed the first commercial smartphone", "answer": "What is IBM?", "value": 1200 },
          { "question": "This cryptocurrency was created by Satoshi Nakamoto", "answer": "What is Bitcoin?", "value": 1600 },
          { "question": "This quantum computer milestone was achieved by Google in 2019", "answer": "What is quantum supremacy?", "value": 2000 }
        ]
      },
      {
        "name": "Scientific Discoveries",
        "questions": [
          { "question": "This scientist discovered penicillin", "answer": "Who is Alexander Fleming?", "value": 400 },
          { "question": "This theory explains the origin of the universe", "answer": "What is the Big Bang Theory?", "value": 800 },
          { "question": "This particle was discovered at CERN in 2012", "answer": "What is the Higgs boson?", "value": 1200 },
          { "question": "This technique allows us to edit genes precisely", "answer": "What is CRISPR?", "value": 1600 },
          { "question": "This telescope detected gravitational waves for the first time", "answer": "What is LIGO?", "value": 2000 }
        ]
      },
      {
        "name": "World Economics",
        "questions": [
          { "question": "This cryptocurrency exchange was founded by Changpeng Zhao", "answer": "What is Binance?", "value": 400 },
          { "question": "This economic theory was developed by John Maynard Keynes", "answer": "What is Keynesian economics?", "value": 800 },
          { "question": "This organization sets interest rates in the United States", "answer": "What is the Federal Reserve?", "value": 1200 },
          { "question": "This index measures the average change in stock prices", "answer": "What is the Dow Jones?", "value": 1600 },
          { "question": "This agreement created the European single market", "answer": "What is the Maastricht Treaty?", "value": 2000 }
        ]
      },
      {
        "name": "Modern Art",
        "questions": [
          { "question": "This artist painted ''The Starry Night''", "answer": "Who is Vincent van Gogh?", "value": 400 },
          { "question": "This Spanish artist co-founded the Cubist movement", "answer": "Who is Pablo Picasso?", "value": 800 },
          { "question": "This artist created the sculpture ''The Thinker''", "answer": "Who is Auguste Rodin?", "value": 1200 },
          { "question": "This pop artist created the Campbell''s Soup Cans", "answer": "Who is Andy Warhol?", "value": 1600 },
          { "question": "This architect designed the Guggenheim Museum in Bilbao", "answer": "Who is Frank Gehry?", "value": 2000 }
        ]
      },
      {
        "name": "Climate Science",
        "questions": [
          { "question": "This greenhouse gas is most abundant in the atmosphere", "answer": "What is carbon dioxide?", "value": 400 },
          { "question": "This phenomenon causes global sea levels to rise", "answer": "What is thermal expansion?", "value": 800 },
          { "question": "This international agreement aims to limit global warming", "answer": "What is the Paris Agreement?", "value": 1200 },
          { "question": "This layer of the atmosphere contains the ozone", "answer": "What is the stratosphere?", "value": 1600 },
          { "question": "This feedback loop accelerates Arctic ice melting", "answer": "What is the albedo effect?", "value": 2000 }
        ]
      },
      {
        "name": "Global Politics",
        "questions": [
          { "question": "This organization has 193 member states", "answer": "What is the United Nations?", "value": 400 },
          { "question": "This treaty established the European Union", "answer": "What is the Treaty of Rome?", "value": 800 },
          { "question": "This leader implemented China''s economic reforms", "answer": "Who is Deng Xiaoping?", "value": 1200 },
          { "question": "This conflict lasted from 1955 to 1975", "answer": "What is the Vietnam War?", "value": 1600 },
          { "question": "This doctrine justified US intervention in Latin America", "answer": "What is the Monroe Doctrine?", "value": 2000 }
        ]
      }
    ]
  },
  {
    "name": "Final Round",
    "category": "Historical Innovations",
    "question": "This 15th-century invention revolutionized the spread of knowledge and is considered one of the most important innovations in human history",
    "answer": "What is the printing press?"
  }
]'::jsonb); 
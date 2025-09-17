import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

// Fix for __dirname with ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// In-memory storage for posts
let posts = [
  {
    id: 1,
    title: "Barcelona make decision on Gavi’s knee injury",
    content: "Barcelona midfielder Gavi has undergone further testing on his knee injury on Monday and a decision has reportedly now been made on the way forwards. Reports from Diario Sport and Mundo Deportivo reveal that Barcelona have decided against another operation for the time being and will instead continue with a conservative treatment plan.MD say Barcelona plan to use the next three weeks to see how Gavi progresses. If the pain subsides then he will be able to return to action, but if not a new plan will have to be made. The club are eager to avoid surgery at the moment and are hoping that the problem will resolve with continued conservative treatment.",
    imageURL: "/images/Gavi.jpg"         // <-- main article image
  },
  { 
    id: 2, 
    title: "Lewandowski nets late winner", 
    imageURL: "/images/Lewandowski.jpg",
    content: `Robert Lewandowski scored three minutes into injury time to give Barcelona a 1-0 win over Valencia.

He had waited all night for what was only the second decent pass he had received – the first he had nodded on to the post in the first half – and when it came from Raphinha’s cross he made no mistake with an outstretched right boot sending the ball past Giorgi Mamardashvili.

There was time for little else once Barça had stopped celebrating, just enough for a 10-man ruck on the far touchline after Dmitri Foulquier had pushed Lewandowski over. They were frustrated with the Pole who had snatched all three points at the death. He now has 13 goals in La Liga and 18 in all competition.

Barcelona are lucky to have him and really need to find him more often. It looked as if they would take just a point home after Ferran Torres missed from five yards out against his old club. 

It was bad enough that Jules Kounde had hobbled off in the second half and will surely now struggle to play again before the World Cup with what looked like a hamstring strain.

The first half had been frustrating for Barcelona. There was none of the slick interchanging of passing that supporters will be expected this far into the season under Xavi. There was usually no more than one option for the player in possession and there was a carelessness too that spread throughout almost the entire side.`
  },
{ 
    id: 3, 
    title: "Hansi Flick praises Pedri", 
    imageURL: "/images/Pedri.jpg",
    content: `Barcelona head coach Hansi Flick has praised midfielder Pedri for his influence during the 2024-25 La Liga campaign. In an interview with Barca One, the German manager echoed the sentiments of star winger Raphinha, who previously described Pedri as the "heart of the team." The 22-year-old played a pivotal role in Barca's domestic treble wins, registering six goals and eight assists in 59 appearances.

Pedri, who has a contract with Barcelona until June 2030, emerged as a central figure in the team's midfield this season. Despite injury setbacks last season, he maintained strong fitness levels throughout the 2024-25 campaign. He started 92% of the club's La Liga games, playing 2,895 minutes in La Liga. While Lamine Yamal and Raphinha did the bulk of scoring, it was Pedri who controlled the game's tempo and dictated play.

Flick said via Barca One: "Raphinha said Pedri is the heart of the team? Yes, exactly. Pedri is fantastic. When he touches the ball, you see real magic. He's getting better, constantly developing himself. I remember in the Valencia game when we brought him on in the second half, he completely changed the game.

"Pedri is only 22 years old, but he has enough to be a leader in the coming years. I will do everything to help him become that leader, because he has all the qualifications."`
  },  
  { 
    id: 4, 
    title: "Barcelona's New kit", 
    imageURL: "/images/Kit.jpg",
    content: `The home shirt follows the classic Blaugrana palette with a modern gradient stripe merge, while the away kit will likely adopt a bold “Mamba” theme in light gold and purple. A vibrant “Bright Mango” third kit nods to Nike’s Total 90 heritage, complete with a dedicated Total 90 third goalkeeper set.

The American sports manufacturing giants Nike have been supplying the Catalonia-based side's kits since 1998, and the age-old partnership will continue in the 2025-26 season as well, despite rumours of a split in 2024.

Barcelona have pulled the curtain back on their brand-new home kit for the 2025/26 campaign—and it's already turning heads. Crafted by Nike, the latest strip offers a bold twist on the club’s iconic Blaugrana design, while still paying homage to its roots.

Adding to its premium appeal, all the logos are finished in a striking yellow, popping nicely against the richer tones of the kit. On the upper back, a clever fusion of the Catalan flag and club colors adds a subtle but meaningful touch.

Stylish on the pitch and sharp enough to wear in the stands, the 2025-26 Barça home shirt is available now for €150 (£128, $175), with fans already snapping it up since its July 2 release.

The jersey features a clean, modern silhouette, with a rounded collar and neatly tailored sleeve cuffs that give it a polished, athletic edge. What really sets this shirt apart is the gradient blend of red and deep blue down the middle, creating a smooth transition that brings a fresh flair to the classic vertical stripes.`
  },  
  { id: 5, 
    title: "Lamine Yamal’s Spectacular Goal Seals Barcelona’s Victory Over Mallorca", 
    imageURL: "/images/Lamine.jpg",     
    content: `Barcelona, the reigning champions, dictated the tempo from the very first whistle. The opener came in the 7th minute when Raphinha headed home a pinpoint cross delivered by Lamine Yamal. Just 16 minutes later, Ferran Torres doubled the advantage with a powerful long-range effort, a strike that sparked debate among refereeing experts.

The pressure from Barça proved too much, and Mallorca ended the first half down by two players, with Manu Morlanes and Vedat Muriqi both sent off before the break. From that moment on, the Catalan side had the match completely under control.

Already decisive with an assist, Lamine Yamal capped his performance with a moment of brilliance in stoppage time. The 17-year-old unleashed a curling shot into the top corner, leaving no chance for the goalkeeper and sealing the 0-3 result.`
  },
  { 
    id: 6, 
    title: "Rashford might struggle with offside lines after Barcelona move", 
    imageURL: "/images/Rashford.jpg",
    content: `Marcus Rashford has yet to kick a ball for Barcelona — he was only officially unveiled yesterday — but fans are already raising concerns about how well he’ll fit into Hansi Flick’s system.
More specifically, whether he'll be able to hold the offside line.

It all started when the English forward showed up to his unveiling in a rather unfortunate pair of sharply pointed shoes — the kind that made it look like his feet were a full two sizes bigger than they actually are.
Naturally, fans couldn’t help but crack jokes.

In reality, Rashford wears a normal UK size 9 – so rest assured, it’s a complete non-issue.`
  },  
  { id: 7, 
    title: "Raphinha", 
    imageURL: "/images/Raphinha.jpg",
    content: `On his 18th birthday, Raphinha sat alone in his tiny room in Florianopolis, staring at his phone. No messages. No calls. No offers. Injured and out of the Avai U20 team, he was on the verge of giving up.

Football had been his escape from the favelas of Brazil's Porto Alegre, but now it felt like a dead end. His dream was slipping away and for the first time - although by no means the last - he wondered if he was chasing something that wasn't meant for him.

Then came the voice that changed everything. His mother, always his fiercest supporter, refused to let him quit. "If you stop now," she told him, "you'll have to live with this for the rest of your life. Are you ready for that?"

That moment became his turning point. Fast forward to today, and the same player who nearly walked away from football is now at the heart of Barcelona's revival, delivering goals and defying expectations.

Raphinha's journey from Porto Alegre to Barcelona's dressing room is a story of resilience, discipline, and continuous self-improvement. His transformation into a top-level performer is not just about talent. It's about mindset, sacrifice, and an unwavering desire to succeed.

Should Barcelona somehow manage to win this inaugural season of the new-look Champions League, it will also be a personal triumph for the 28-year-old, who as recently as last summer was cast in the role of sacrificial lamb in Barcelona's attempt to bring in Athletic Bilbao's Nico Williams.

He again showed his worth in Tuesday's last-16 second leg against Benfica, scoring twice to help send Barca through to the quarter-finals.

So how did Raphinha get to here?

Raphinha was raised in the relentless, grinding poverty seen across the sprawling shanty towns that litter the landscape in and around the neighbourhood of Restinga in the city of Porto Alegre.

In a neighbourhood where violence and drug trafficking are often a way of life, Raphael Dias Belloli knew from an early age that football was not just a way out - it was the only way out.

He has spoken about how he saw talented friends take the wrong path. Unlike them, he had the support of his family, especially his mother and uncle, who encouraged him to keep pushing forward with sport despite financial struggles.

His mother worked tirelessly, and his family made sacrifices to buy him football boots and pay for his transport to training sessions.

His football education was all about survival; playing barefoot against older opponents in the streets helped him develop endurance and technical skills under pressure. Both would become his most defining traits.

He was initially rejected by clubs like Internacional and Gremio because they considered him too thin and lightweight for professional football.

Despite these setbacks, the rejection fuelled his competitive spirit and obsession with proving people wrong. Eventually he got a chance at Avai, a smaller club with a solid youth system where he learnt to handle the physical side of the game before having to face the first of many crises.

A serious injury at Avai's U20 team left him sidelined and questioning his footballing future. The turning point came when his mother reminded him in no uncertain terms that giving up would mean having to find a 'proper' job.

From that moment, his commitment to discipline and sacrifice became absolute, he started seeing football not just as a passion but his only way to a better life.

How Europe came calling and his rapid rise

Raphinha with his hand in the air and the other hand pointing in celebration

Unlike many Brazilian stars who first shine at major domestic clubs, Raphinha had to prove himself in Europe from the bottom up.

In Portugal, first with Vitoria Guimaraes and then Sporting, he showed his ability to beat defenders and create chances, while at Rennes he proved he could be a game changer.

He was catching the eyes of the bigger clubs and, fortunately for him, he attracted the attention of the hardest of taskmasters that is Marcelo Bielsa, who took him to Leeds and rapidly accelerated his development albeit via a harsh, unforgiving regime.

It was there that he developed an outstanding physical endurance, which made his explosive playing style sustainable, improved his off-the-ball movement and pressing intensity and learned to move intelligently without the ball.

He also caught the attention of Barcelona who signed him on a five-year contract for a reported initial fee of £50m, potentially rising to £55 million in add-ons.

Another club, another struggle

Raphinha struggled initially playing for an elite club.

Coach Xavi saw him more as a squad member than as an undisputed starter and even when he started to be a regular in the line up, he rarely played full games.

Barcelona's inability to buy without selling first due to financial issues put him firmly in the frame as the club's biggest playing asset and the player most likely to be sold - especially while Barcelona were trying to sign Athletic Bilbao's Nico Williams last summer.

Focus was also elsewhere with the precocious and outrageously talented Lamine Yamal the centre of everyone's attention and effectively undroppable.

In two seasons at the club, Raphinha was used off the bench 11 times and started just 42 times out of a possible 76.

The message coming out of Barcelona was simple. "We don't want to lose you, but we think you ought to go," seemed to be the gist of it.

Raphinha had other ideas, although it was a close-run thing.

"There were several moments, not just one [when I considered leaving]," he admits now.

"There was a lot of self-doubt. I have a nasty habit of criticising myself heavily, so to speak, so that pressure made me think about leaving."

The role of Hansi Flick

Barcelona boss Hansi Flick and Raphinha shaking hands

Hansi Flick was appointed Barcelona head coach in May 2024

The dismissal of manager Xavi in May and subsequent appointment of Hansi Flick changed everything.

The German coach gave him a bigger role and allowed him to play with confidence. He is now a player reborn.

Flick focused his work on the importance of making smarter decisions, knowing when to dribble, when to pass. The more direct style suited him too.

These days he loses the ball less and is more efficient and composed in front of goal. His current stats are remarkable.

He has 26 goals and 19 assists in 40 games and has scored in every match he has played in the Champions League this season. He has established himself as one of Barcelona's key players and a genuine Ballon d'Or contender.

He has also been voted as one of the team captains, receiving the fourth-highest tally of votes behind Marc-Andre ter Stegen, Ronald Araujo and Frenkie de Jong. When they were injured he became the club's outright skipper.

Lamine Yamal, who also played a starring role in Tuesday's win over Benfica, has publicly said Raphinha is his main mentor in the squad.

That complements well with the fact that with the Brazilian national team he is the undisputed number one leader in the group.

His last-minute winner in the club's pulsating 4-5 group stage win in Benfica was a key moment in his and the club's season.

His celebration, with Barca's entire bench running towards him in the pouring rain, became a symbolic image of the team's unity and cemented his status as a dressing room leader.

He is clearly one of the most-respected voices in the dressing room, not overly vocal, but rather a leader by example, not just in matches but just as importantly in training.

Raphinha knows just how hard it has been for him to get where he is today, just how fickle footballing fate can be and that it is primarily during your most successful times that you find yourself closest to failure.

To that end he leaves nothing to chance. He has spoken openly about how he avoids distractions outside football.

He has no interest in nightlife or partying, preferring to spend time at home with his family or focusing on training. It is this discipline that has been key to raising him to his physical and mental peak.

And now he has reached this point, there is no stopping him and if Barcelona go far in the Champions League, nobody should argue his right to be considered one of the top players in the world.`

 },
  { id: 8, 
    title: "How Hansi Flick transformed FC Barcelona", 
    imageURL: "/images/HansiFlick.jpg",
    content:`Barcelona fans have had a lot to celebrate lately. Hansi Flick, in his first season has done what many doubted could be achieved in such a short time. After their struggles last season, no one could’ve imagined the turnaround the German coach would inspire. Let’s dive into the tactics and strategies that have revitalized them this season.

Offsides traps
 
The ex-Bayern manager has made Barcelona one of Europe’s top teams in drawing offsides. In fact, they’ve caught opponents offside more than any other team across Europe’s leagues this season — in their 4-0 win against Borussia Dortmund, they caught BVB out four times. The tactic has been crucial, especially when defending against high-speed forwards.

Line-breaking passes

Flick’s defenders have been trained to master those split-second movements to break the opponent’s attacking momentum. The German is also integrating La Masia talents like Pau Cubarsí into these defensive schemes, adding fresh energy and deep technical knowledge to the team.

This season he has introduced a twist on tiki-taka. Players like Pedri and Marc Casadó are tasked with line-breaking passes, aiming to destabilize the opposition faster than before. This has empowered the attackers to act with greater speed and decisiveness, making their game more unpredictable and exciting. The change is clear: Barcelona now completed the same task in fewer passes, moving up the pitch rapidly and creating more chances for their strikers.

Attacking Mastery
 
In terms of attack, Flick’s blend of old and new faces has been striking. Robert Lewandowski, a seasoned goal scorer, has returned to top form. Then there’s the reinvention of Raphina, who’s taken on a leadership role as captain and his performances this season have silenced doubters, showcasing him as Europe’s most in form winger. And while these veterans have excelled, the youth from La Masia have been just as crucial.

Lamine Yamal, at only 17 has risen as one of Europe’s most exciting young stars, with some even comparing his flair to Neymar. His performances have demonstrated maturity beyond his years, and his ability to assist and score has helped create one of Europe’s most dynamic attacking trios alongside Lewandowski and Raphina.

Conclusion

Flick’s ability to balance veterans and rising talents has created a well-rounded squad that is competitive and energetic. Under Flick, Barcelona isn’t just rebuilding, they’re evolving. The combination of speed, strategic positioning and tactical precision has made them a powerhouse yet again. And with their recent performances, it’s safe to say that Hansi Flick has brought a new era to Barcelona.`
}
];


app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.use(methodOverride("_method")); // enables PUT/DELETE via query ?_method=PUT
app.set("view engine", "ejs");

// --- Multer setup ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "public/images"));
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

// Routes
// Home page
app.get("/", (req, res) => {
  res.render("index", { posts });
});

// New post form
app.get("/posts/new", (req, res) => {
  res.render("new");
});

// Create new post (with image upload)
app.post("/posts", upload.single("image"), (req, res) => {
  const { title, content } = req.body;

  if (!req.file) {
    return res.status(400).send("Image upload required.");
  }

  const newPost = {
    id: posts.length + 1,
    title,
    content,
    imageURL: "/images/" + req.file.filename
  };

  posts.push(newPost);
  res.redirect("/");
});

// Show single post
app.get("/posts/:id", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");
  res.render("post", { post, posts });
});

// Edit post form
app.get("/posts/:id/edit", (req, res) => {
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");
  res.render("edit", { post, posts });
});

// Update post
app.put("/posts/:id", (req, res) => {
  const { title, content } = req.body;
  const post = posts.find(p => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).send("Post not found");

  post.title = title;
  post.content = content;
  res.redirect(`/posts/${post.id}`);
});

// Delete post
app.delete("/posts/:id", (req, res) => {
  posts = posts.filter(p => p.id !== parseInt(req.params.id));
  res.redirect("/");
});

// About page
app.get("/about", (req, res) => {
  res.render("about");
});
// Contact page
app.get("/contact", (req, res) => {
  res.render("contact");
});

// Server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
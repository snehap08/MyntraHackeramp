const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const fs = require('fs');

// Predefined tags for each image
const imageTags = {
  'women/image1.jpeg': ['pink', 'dress', 'party'],
  'women/image2.jpeg': ['floral', 'frock', 'knee-length'],
  'women/image3.jpeg': ['forest', 'queen', 'iridescent', 'silk'],
  'women/image4.jpeg': ['white', 'bodycon', 'halter neck'],
  'women/image5.jpeg': ['beige', 'kotty', 'top', 'pants'],
  'women/image6.jpeg': ['off white', 'boxy', 'casual', 'shirt'],
  'women/image7.jpeg': ['blue', 't-shirt', 'shorts'],
  'women/image8.jpeg': ['blue', 'flare', 'gown', 'dress','ruffled'],

  //Men Tags
  'men/image1.jpeg': ['black', 'formal', 'blazer', 'notch lapel', 'long sleeves', 'button closure'],
  'men/image2.jpeg': ['off white', 'solid', 'boxy fit', 'casual shirt', 'mandarin collar', 'button placket', 'patch pocket', 'short sleeves', 'extended sleeves', 'straight hem', 'green', 'bell bottom', 'trouser'],
  'men/image3.jpeg': ['sleek', 'modern', 'high-tech jacket', 'LED lights', 'slim-fit', 'cargo pants', 'smart sneakers', 'city explorer', 'urban fashion'],
  'men/image4.jpeg': ['navy blue', 'grey', 'checked', 'casual shirt', 'spread collar', 'button placket', 'long sleeves', 'roll-up tabs', 'chest pocket', 'curved hem'],
  'men/image5.jpeg': ['solid color', 'autumn', 'streetwear', 'short sleeve', 'blazer', 'korean pants', 'cherry-brown'],
  'men/image6.jpeg': ['sophisticated', 'majestic', 'enchanted forest king', 'tailored', 'velvet jacket', 'emerald green', 'gold embroidery', 'vines', 'forest motifs'],
  'men/image7.jpeg': ['red', 'athletic shorts', 'elastic waistband', 'moisture-wicking fabric'],
  'men/image8.jpeg': ['beige', 'kurta', 'red flowers', 'green flowers', 'leaves embroidery', 'mandarin collar'],
  // Footwear Tags
  'footwear/image1.jpeg': ['soft pink', 'braided sandals', 'heels'],
  'footwear/image2.jpeg': ['sky blue', 'sneakers', 'cloud print', 'light pink sole'],
  'footwear/image3.jpeg': ['baby pink', 'knee-high boots', 'stone work', 'sexy'],
  'footwear/image4.jpeg': ['comfortable', 'stylish', 'bridal', 'red', 'sneaker', 'embroidery', 'stone work', 'bride'],
  
  // Bags and Accessories Tags
  'bags_accessories/image1.jpeg': ['pleated', 'cloud bubble', 'shoulder bag', 'tote', 'soft green', 'plaid', 'large capacity', 'crossbody', 'travel'],
  'bags_accessories/image2.jpeg': ['rhinestones', 'clutch bags', 'diamonds', 'yellow', 'tassels', 'finger ring', 'crystal', 'wedding', 'bridal', 'handbags', 'purse'],
  'bags_accessories/image3.jpeg': ['jewelry set', 'necklace', 'pink ruby', 'lotus flower', 'green leaves', 'green gemstones', 'earrings'],
  'bags_accessories/image4.jpeg': ['rose petal', 'finger ring', 'red', 'garnet stone']
  // Add more images and tags as needed
};


// Helper function to match images based on prompt
function matchImages(prompt, category) {
  const keywords = prompt.toLowerCase().split(' ');
  console.log(`Matching images for prompt: ${prompt}, category: ${category}`);
  console.log(`Keywords: ${keywords}`);
  const matchedImages = Object.keys(imageTags).filter(image => {
      // Ensure the image belongs to the correct category
      if (!image.startsWith(category)) {
          return false;
      }

      else{
      // Check if any of the keywords match the tags of the image
      const imageKeywordMatches = imageTags[image].filter(tag => keywords.includes(tag));
      console.log(`Checking image: ${image}, Tags: ${imageTags[image]}, Matches: ${imageKeywordMatches}`);
      return imageKeywordMatches.length > 0;
      }
  });
  console.log(`Matched images: ${matchedImages}`);
  return matchedImages;
}


// Route to handle the prompt input
router.post('/type-prompt', (req, res) => {
  const userPrompt = req.body.prompt;
  const category = req.body.category;
  const matchedImages = matchImages(userPrompt, category);

  if (matchedImages.length > 0) {
      res.render('display-image', { images: matchedImages, prompt: userPrompt, category: category });
  } else {
      res.render('display-image', { images: [], message: 'No images for selected prompt', prompt: userPrompt, category: category });
  }
});


const prompts = {
  women_wear: [
    "Pink, Women Fit & Flare Dress with Ruffled-Sleeves Party Dresses perfect for Casual occasion.",
    "A knee-length frock adorned with vibrant, printed floral designs. The dress features a fitted bodice with a gentle scoop neckline and short, flutter sleeves.",
    "A dream-like dress inspired by an enchanted forest queen, viewed from the front. The bodice is made of iridescent silk that shimmers with a pearlescent glow, featuring intricate silver embroidery of vines and tiny flowers.",
    "Beautifully tailored White solid bodycon dress Halter neck Sleeveless, no sleeves Ruffled details Knee length length",
    "Set of 2-Beige kotty style top with flared pants for women",
    "Off white solid boxy fit casual shirt, has a mandarin collar, button placket, 1 patch pocket, short, extended sleeves, straight hem",
    "A casual and comfortable outfit featuring a simple blue t-shirt and beige shorts. The blue t-shirt has a short, beautiful message written on it. The beige shorts are tailored to fold neatly at the knees.",
    "Sky-blue, Women Flare gown in Ruffled-pattern which looks simple yet stylish."
  ],
  men_wear: [
    "Black, Men Formal Blazer with notch lapel, long sleeves, and button closure.",
    "Off white solid boxy fit casual shirt, has a mandarin collar, button placket, 1 patch pocket, short, extended sleeves, straight hem with a green bell bottom trouser.",
    "A sleek, modern outfit featuring a high-tech jacket with built-in LED lights, slim-fit cargo pants, and a pair of smart sneakers. The ensemble is designed for a city explorer who blends cutting-edge technology with urban fashion.",
    "Navy blue and grey checked casual shirt, has a spread collar, button placket, long sleeves with roll-up tabs, a chest pocket, curved hem",
    "Solid Color Autumn Streetwear Short Sleeve Blazer & korean Pants In Cherry-brown",
    "A sophisticated and majestic outfit inspired by the regal allure of an enchanted forest king. The ensemble features a tailored velvet jacket in a rich emerald green, adorned with intricate gold embroidery of intertwining vines and forest motifs",
    "Red, Men Athletic Shorts with elastic waistband and moisture-wicking fabric.",
    "Men, beige color kurta with red and green flowers and leaves embroidery have a mandarin collar"
  ],
  footwear:[
    "A soft pink shade braided sandals with heels",
    "Sky blue sneakers with cloud print work on few areas and a bit higher shade with light pink shade sole",
    "Baby pink color sexy looking knee-high boots with proper stone work on sides and areas",
    "Comfortable and stylish bridal red sneaker with embroidery and stone work perfectly crafted for bride"
  ],
  bags_accessories:[
    "Pleated Cloud Bubble Shoulder Bag Tote Soft green Color Plaid Large Capacity Crossbody Travel for Women",
    "Rhinestones Women Clutch Bags Diamonds of yellow color Tassels Finger Ring Crystal Wedding Bridal Handbags Purse",
    "Jewelry Set has a necklace with a locket of pink ruby stone radiant lotus flower and the necklace chain consists of green leaves made up of green gemstones match with earrings of the same pattern",
    "Beautiful Rose petal finger ring set made up of garnet stone"
  ]
  // Add more categories if needed
};

const images = {
  "Pink, Women Fit & Flare Dress with Ruffled-Sleeves Party Dresses perfect for Casual occasion.": ['prompt1_img1.jpeg', 'prompt1_img2.jpeg', 'prompt1_img3.jpeg', 'prompt1_img4.jpeg', 'prompt1_img5.jpeg', 'prompt1_img6.jpeg', 'prompt1_img7.jpeg',],
  "A knee-length frock adorned with vibrant, printed floral designs. The dress features a fitted bodice with a gentle scoop neckline and short, flutter sleeves.": ['prompt2_img1.jpeg', 'prompt2_img2.jpeg', 'prompt2_img3.jpeg', 'prompt2_img4.jpeg', 'prompt2_img5.jpeg'],
  "A dream-like dress inspired by an enchanted forest queen, viewed from the front. The bodice is made of iridescent silk that shimmers with a pearlescent glow, featuring intricate silver embroidery of vines and tiny flowers.": ['prompt3_img1.jpeg', 'prompt3_img2.jpeg', 'prompt3_img3.jpeg', 'prompt3_img4.jpeg','prompt3_img5.jpeg', 'prompt3_img6.jpeg', 'prompt3_img8.jpeg','prompt3_img9.jpeg', 'prompt3_img10.jpeg'],
  "Beautifully tailored White solid bodycon dress Halter neck Sleeveless, no sleeves Ruffled details Knee length length": ['prompt4_img1.jpeg', 'prompt4_img2.jpeg', 'prompt4_img3.jpeg', 'prompt4_img4.jpeg', 'prompt4_img5.jpeg'],
  "Set of 2-Beige kotty style top with flared pants for women": ['prompt5_img1.jpeg', 'prompt5_img2.jpeg', 'prompt5_img3.jpeg', 'prompt5_img4.jpeg'],
  "Off white solid boxy fit casual shirt, has a mandarin collar, button placket, 1 patch pocket, short, extended sleeves, straight hem": ['prompt6_img1.jpeg', 'prompt6_img2.jpeg', 'prompt6_img3.jpeg', 'prompt6_img4.jpeg'],
  "A casual and comfortable outfit featuring a simple blue t-shirt and beige shorts. The blue t-shirt has a short, beautiful message written on it. The beige shorts are tailored to fold neatly at the knees.": ['prompt7_img1.jpeg', 'prompt7_img2.jpeg', 'prompt7_img3.jpeg', 'prompt7_img4.jpeg'],
  "Sky-blue, Women Flare gown in Ruffled-pattern which looks simple yet stylish.": ['prompt8_img1.jpeg', 'prompt8_img2.jpeg', 'prompt8_img3.jpeg', 'prompt8_img4.jpeg'],
  "Black, Men Formal Blazer with notch lapel, long sleeves, and button closure.": ['men_prompt1_img1.jpeg', 'men_prompt1_img2.jpeg', 'men_prompt1_img3.jpeg'],
  "Off white solid boxy fit casual shirt, has a mandarin collar, button placket, 1 patch pocket, short, extended sleeves, straight hem with a green bell bottom trouser.": ['men_prompt2_img1.jpeg', 'men_prompt2_img2.jpeg', 'men_prompt2_img3.jpeg'],
  "A sleek, modern outfit featuring a high-tech jacket with built-in LED lights, slim-fit cargo pants, and a pair of smart sneakers. The ensemble is designed for a city explorer who blends cutting-edge technology with urban fashion.": ['men_prompt3_img1.jpeg', 'men_prompt3_img2.jpeg', 'men_prompt3_img3.jpeg'],
  "Navy blue and grey checked casual shirt, has a spread collar, button placket, long sleeves with roll-up tabs, a chest pocket, curved hem": ['men_prompt4_img1.jpeg', 'men_prompt4_img2.jpeg', 'men_prompt4_img3.jpeg', 'men_prompt4_img4.jpeg'],
  "Solid Color Autumn Streetwear Short Sleeve Blazer & korean Pants In Cherry-brown": ['men_prompt5_img1.jpeg', 'men_prompt5_img2.jpeg', 'men_prompt5_img3.jpeg'],
  "A sophisticated and majestic outfit inspired by the regal allure of an enchanted forest king. The ensemble features a tailored velvet jacket in a rich emerald green, adorned with intricate gold embroidery of intertwining vines and forest motifs": ['men_prompt6_img1.jpeg', 'men_prompt6_img2.jpeg', 'men_prompt6_img3.jpeg'],
  "Red, Men Athletic Shorts with elastic waistband and moisture-wicking fabric.": ['men_prompt7_img1.jpeg', 'men_prompt7_img2.jpeg', 'men_prompt7_img3.jpeg'],
  "Men, beige color kurta with red and green flowers and leaves embroidery have a mandarin collar": ['men_prompt8_img1.jpeg', 'men_prompt8_img2.jpeg', 'men_prompt8_img3.jpeg'],
  "A soft pink shade braided sandals with heels":['foot_prompt1_img1.jpeg','foot_prompt1_img2.jpeg','foot_prompt1_img3.jpeg'],
  "Sky blue sneakers with cloud print work on few areas and a bit higher shade with light pink shade sole" :['foot_prompt2_img1.jpeg','foot_prompt2_img2.jpeg','foot_prompt2_img3.jpeg'],
  "Baby pink color sexy looking knee-high boots with proper stone work on sides and areas" :['foot_prompt3_img1.jpeg','foot_prompt3_img2.jpeg'],
  "Comfortable and stylish bridal red sneaker with embroidery and stone work perfectly crafted for bride":['foot_prompt4_img1.jpeg','foot_prompt4_img2.jpeg','foot_prompt4_img3.jpeg'],
  "Pleated Cloud Bubble Shoulder Bag Tote Soft green Color Plaid Large Capacity Crossbody Travel for Women":['bag_prompt1_img1.jpeg','bag_prompt1_img2.jpeg','bag_prompt1_img3.jpeg'],
  "Rhinestones Women Clutch Bags Diamonds of yellow color Tassels Finger Ring Crystal Wedding Bridal Handbags Purse":['bag_prompt2_img1.jpeg','bag_prompt2_img2.jpeg','bag_prompt2_img3.jpeg'],
  "Jewelry Set has a necklace with a locket of pink ruby stone radiant lotus flower and the necklace chain consists of green leaves made up of green gemstones match with earrings of the same pattern":['bag_prompt3_img1.jpeg','bag_prompt3_img2.jpeg','bag_prompt3_img3.jpeg','bag_prompt3_img4.jpeg'],
  "Beautiful Rose petal finger ring set made up of garnet stone" :['bag_prompt4_img1.jpeg','bag_prompt4_img2.jpeg','bag_prompt4_img3.jpeg','bag_prompt4_img4.jpeg']
};
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Myntra Designer' });
});

router.post('/select-prompt', function(req, res, next) {
  const category = req.body.prompt;
  res.redirect(`/prompts/${category}`);
});

router.get('/prompts/:category', function(req, res, next) {
  const category = req.params.category;
  res.render('prompts', { category, prompts: prompts[category] });
});

router.post('/confirm-prompt', function(req, res, next) {
  const selectedPrompt = req.body.selectedPrompt;
  res.render('confirm', { prompt: selectedPrompt });
});

router.post('/next-step', function(req, res, next) {
  const action = req.body.action;
  const prompt = req.body.prompt;
  
  if (action === 'view_myntra') {
    res.redirect("http://localhost:3000/"); // Example route
  } else if (action === 'generate_ai_image') {
    res.redirect(`/display-image?prompt=${encodeURIComponent(prompt)}`);
  }
});

router.get('/display-image', function(req, res, next) {
  const prompt = req.query.prompt;
  res.render('display-image', { images: images[prompt] });
});

const designers = [
  {
      name: 'Pansi Boutique',
      location: 'Pune',
      rating: 4.7,
      image: '/images/pansi_boutique.jpg'
  },
  {
      name: 'American Designer Shop',
      location: 'New York',
      rating: 4.3,
      image: '/images/american_designer_shop.jpg'
  },
  {
      name: 'Carlton Cabaliri Shop',
      location: 'London',
      rating: 4.0,
      image: '/images/carlton_cabaliri_shop.jpg'
  },
  {
      name: 'Jyotisha Designer',
      location: 'Connaught House',
      rating: 4.5,
      image: '/images/jyotisha_designer.jpg'
  },
  {
      name: 'Sneha Saachi Designs',
      location: 'Cefarino Designers Club',
      rating: 4.2,
      image: '/images/sneha_saachi_designs.jpg'
  }
];



router.get('/select-designer', function (req, res) {
  console.log('select-designer route hit');
  res.render('select_designer', { designers: designers });
});

const upload = multer({ dest: 'public/uploads/' });

router.get('/chat/:designerName', (req, res) => {
    const designerName = req.params.designerName;
    res.render('chat', { designerName: designerName });
});


module.exports = router;

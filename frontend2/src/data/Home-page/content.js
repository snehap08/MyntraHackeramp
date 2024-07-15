const data = {
  content: [
    {
      title: "Your Guide to Influencer-Endorsed Fashion",
      description:
        "At Myntra, unlock the latest trends with our curated Influencer-Endorsed Fashion Guide, tailored just for you!",
      getStartedLink: "/home",
      playLink: "/Go",
      stats: [
        { name: "New Customers", value: "300+" },
        { name: "Products Sold", value: "200+" },
      ],
    },
  ],

  products: [
    {
      widgetProductCard: {
        id: 1,
        productName: "Dresses",
        productImage: require("../../assets/images/coat.jpg"),
        discountText: "10% OFF",
      },
    },
    {
      widgetProductCard: {
        id: 2,
        productName: "glasses",
        productImage: require("../../assets/images/shorts.jpg"),
        discountText: "15% OFF",
      },
    },
  ],
};

export default data;


const RecommendationService = {
   
    getRecommendedProducts: async () => {
      
      const sampleRecommendedProducts = [
        { id: 1, name: 'Recommended Product 1', price: 29.99, category: 'Electronics' },
        { id: 2, name: 'Recommended Product 2', price: 39.99, category: 'Fashion' },
        { id: 3, name: 'Recommended Product 3', price: 49.99, category: 'Home & Kitchen' },
      ];
  
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(sampleRecommendedProducts);
        }, 1000); 
      });
    },
  };
  
  export default RecommendationService;  
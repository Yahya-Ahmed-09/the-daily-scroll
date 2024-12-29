import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";


const { createContext, useState } = require("react");

const ApiContext = createContext(null);

const ApiProvider = ({ children }) => {
    const [size, setSize] = useState(0);
    const [category, setCategory] = useState('');
    const [newsData, setNewsData] = useState([]);
     const [isLoading, setIsLoading] = useState(true);
     const [savedArticle, setSavedArticle] = useState([]);

   
//    For API call
    const ApiCall = async (size, category = "",) => {
        const api = `https://newsapi.org/v2/top-headlines?country=us${category}&apiKey=a5432d257dc2454db5639e0507e7bc1d&pageSize=${size}`;
        setSize(size);
        setCategory(category);
        setIsLoading(true);
        
        try {
            const response = await axios.get(api)
            
            const filteredArticles = response.data.articles.filter(article => 
                article.author?.trim() && 
                article.description?.trim() && 
                article.title?.trim()
            );
            setNewsData(filteredArticles);
    setIsLoading(false);
        } catch (error) {
            console.error('Error fetching news:', error);
            setNewsData([]);
            setIsLoading(false);
        }

    }

    const CategoryApiCall = async (size, category = "", page = 1) => {
        const api = `https://newsapi.org/v2/top-headlines?country=us${category}&apiKey=a5432d257dc2454db5639e0507e7bc1d&pageSize=${size}&page=${page} `
        setSize(size);
        setCategory(category);
        setIsLoading(true);
        
        try {
            const response = await axios.get(api)
            
            const filteredArticles = response.data.articles.filter(article => 
                article.author?.trim() && 
                article.description?.trim() && 
                article.title?.trim()
            );
            // setNewsData(filteredArticles);
            setNewsData(prevData => [...prevData, ...filteredArticles]);
    setIsLoading(false);  
        } catch (error) {
            console.error('Error fetching news:', error);
            setNewsData([]);
            setIsLoading(false);
        }
    }
    //  For saving articles
    const getSavedNews = async (item, index) => {
        try {
           const savedData = await AsyncStorage.getItem('bookmarks');

        let storedArticles = [];
        if (savedData) {
            storedArticles = JSON.parse(savedData);
        }

        const isArticleSaved = storedArticles.find((article) => article.title === item.title);
    
            if (!isArticleSaved) {
                const updatedArticles = [...storedArticles, item];
                await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedArticles));
                
                setSavedArticle(updatedArticles);

            } else {
                const updatedArticles = storedArticles.filter((article) => article.title !== item.title);
                await AsyncStorage.setItem('bookmarks', JSON.stringify(updatedArticles))

                setSavedArticle(updatedArticles);

            }
    
        } catch (error) {
            console.error('Error saving article:', error);
        }
        
    };
    // For clearing articles
    const clearBookmark = async () => {
        try {
            await AsyncStorage.removeItem('bookmarks');
            await AsyncStorage.removeItem('bookmarkStatus');
            setSavedArticle([]);
            
        } catch (error) {
            console.error('Error clearing bookmarks:', error);
        }
    }
//  Load saved articles
    const loadBookmark = async () => {
        try {
            const savedData = await AsyncStorage.getItem('bookmarks');
            const parsedData = savedData ? JSON.parse(savedData) : []; // Parse data if it exists, or default to an empty array
            setSavedArticle(parsedData);
            
            
        } catch (error) {
            console.error('Error loading bookmarks:', error);
        }
        
      };

      
    return (
        <ApiContext.Provider value={{ ApiCall,getSavedNews, savedArticle,clearBookmark, loadBookmark, newsData,setNewsData, isLoading, CategoryApiCall }}>
            {children}
        </ApiContext.Provider>
    )
}
export { ApiContext, ApiProvider }
# Stock Price Prediction with LSTM 📈💹

Welcome to the **Stock Price Prediction** project! This application uses deep learning (LSTM model) to predict the next closing price of selected stocks. Below is a detailed breakdown of the project and its components. 🚀

---

## 📌 **Project Overview**
This project leverages:
- **yfinance** to fetch historical stock data.
- **TensorFlow/Keras** to build and train an LSTM model.
- **Gradio** to create an interactive web interface for users.
- **Matplotlib** for visualizing stock trends and predictions.

The goal is to provide a simple yet powerful tool for predicting stock prices using machine learning. 🧠💡

---

## 🛠 **Features**
1. **Stock Selection** 📊  
   - Choose from popular stocks like Apple (AAPL), Google (GOOGL), Microsoft (MSFT), Tesla (TSLA), and Amazon (AMZN).
   - Each stock is represented with a fun emoji for better UX. 😊

2. **Data Processing** 🔄  
   - Fetches 5 years of historical stock data.
   - Normalizes the data using `MinMaxScaler` for better model performance.

3. **LSTM Model** 🤖  
   - A sequential model with two LSTM layers and a Dense layer.
   - Trained on the last 60 days of data to predict the next closing price.

4. **Visualization** 📉  
   - Plots the last 100 days of actual stock prices.
   - Highlights the predicted next closing price with a red dashed line.

5. **User-Friendly Interface** 🖥️  
   - Built with Gradio for easy interaction.
   - Displays the predicted price and a plot in real-time.

---

## 🚀 **How It Works**
1. **Fetch Data**  
   - The app downloads 5 years of historical stock data using `yfinance`.

2. **Preprocess Data**  
   - The closing prices are extracted and normalized to a range of [0, 1].

3. **Train Model**  
   - Sequences of 60 days are created to train the LSTM model.
   - The model is trained for 5 epochs (for demo purposes; more epochs can improve accuracy).

4. **Predict Price**  
   - The last 60 days of data are used to predict the next closing price.
   - The prediction is converted back to the original scale.

5. **Display Results**  
   - The predicted price is shown as text.
   - A plot of the last 100 days and the predicted price is displayed.

---

## 📂 **File Structure**
- `stock_price.ipynb`: The main Jupyter notebook containing the code.
  - Install required libraries (`yfinance`, `pandas`, `gradio`, `scikit-learn`, `matplotlib`, `tensorflow`, `pillow`).
  - Imports necessary modules.
  - Defines stock options with emojis.
  - Implements the `get_stock_data` function for fetching, processing, training, and predicting.
  - Creates a Gradio interface for user interaction.

---

## � **Limitations**
- The model is trained for only 5 epochs for quick demo purposes. For better accuracy, increase epochs or adjust hyperparameters.
- Predictions are based solely on historical prices and do not account for external factors like news or market sentiment. 📰
- The app uses a simple LSTM architecture; more complex models may yield better results.

---

## 🎯 **Future Improvements**
- Add more stocks or allow custom ticker input. 💬
- Incorporate additional features like volume or moving averages. 📊
- Deploy the app permanently using Hugging Face Spaces or another hosting service. ☁️
- Implement a more sophisticated model or ensemble methods. 🔥
![image](https://github.com/user-attachments/assets/7f506467-3367-4f99-a118-99d366e11d2d)

import React, { useState } from "react";
import "../CSS/AccDashNotification.css";

export default function AccDashNotification() {
  const [settings, setSettings] = useState({
    weekly: false,
    accountSummary: true,
    textMessages: false,
    callBeforeCheckout: true,
    newFollower: true,
    postLike: false,
    followedPosted: false,
    collection: false,
    orderDelivery: false,
  });

  const handleToggle = (key) => {
    setSettings({
      ...settings,
      [key]: !settings[key],
    });
  };

  return (
    <div className="notification-page">
      <div className="notification-container">
        <h1>Notification settings</h1>

        <section className="notification-section">
          <h2>Email Notifications</h2>

          <div className="setting-row">
            <div className="setting-content">
              <h3>Weekly Notification</h3>
              <p>
                Various versions have evolved over the years, sometimes by
                accident, sometimes on purpose .
              </p>
            </div>

            <button
              className={`toggle ${settings.weekly ? "active" : ""}`}
              onClick={() => handleToggle("weekly")}
            >
              <span></span>
            </button>
          </div>

          <div className="setting-row">
            <div className="setting-content">
              <h3>Account Summary</h3>
              <p>
                Pellentesque habitant morbi tristique senectus et netus et
                malesuada fames ac turpis eguris eu sollicitudin massa. Nulla
                ipsum odio, aliquam in odio et, fermentum blandit nulla.
              </p>
            </div>

            <button
              className={`toggle ${settings.accountSummary ? "active" : ""}`}
              onClick={() => handleToggle("accountSummary")}
            >
              <span></span>
            </button>
          </div>
        </section>

        <section className="notification-section">
          <h2>Order updates</h2>

          <div className="setting-row">
            <div className="setting-content">
              <h3>Text messages</h3>
            </div>

            <button
              className={`toggle ${settings.textMessages ? "active" : ""}`}
              onClick={() => handleToggle("textMessages")}
            >
              <span></span>
            </button>
          </div>

          <div className="setting-row">
            <div className="setting-content">
              <h3>Call before checkout</h3>
              <p>We'll only call if there are pending changes</p>
            </div>

            <button
              className={`toggle ${settings.callBeforeCheckout ? "active" : ""}`}
              onClick={() => handleToggle("callBeforeCheckout")}
            >
              <span></span>
            </button>
          </div>
        </section>

        <section className="notification-section website-section">
          <h2>Website Notification</h2>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={settings.newFollower}
              onChange={() => handleToggle("newFollower")}
            />
            <span>New Follower</span>
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={settings.postLike}
              onChange={() => handleToggle("postLike")}
            />
            <span>Post Like</span>
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={settings.followedPosted}
              onChange={() => handleToggle("followedPosted")}
            />
            <span>Someone you followed posted</span>
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={settings.collection}
              onChange={() => handleToggle("collection")}
            />
            <span>Post added to collection</span>
          </label>

          <label className="checkbox-row">
            <input
              type="checkbox"
              checked={settings.orderDelivery}
              onChange={() => handleToggle("orderDelivery")}
            />
            <span>Order Delivery</span>
          </label>
        </section>
      </div>
    </div>
  );
}
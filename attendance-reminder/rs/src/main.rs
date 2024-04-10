use std::env;

#[tokio::main]
async fn main() {
    dotenv::dotenv().ok();
    let api_token = env::var("CHATWORK_API_TOKEN").expect("CHATWORK_API_TOKEN is not set");
    let room_id = env::var("CHATWORK_ROOM_ID").expect("CHATWORK_ROOM_ID is not set");
    let to_user_id = env::var("CHATWORK_TO_USER_ID").unwrap_or("".to_string());
    let url = format!("https://api.chatwork.com/v2/rooms/{}/messages", room_id);

    let message = format!("[To:{}]出勤押した？", to_user_id);
    let body = format!("body={}&self_unread=0", message);

    let client = reqwest::Client::new();

    let res = client
        .post(&url)
        .header("x-chatworktoken", api_token.clone())
        .header("accept", "application/json")
        .body(body.clone())
        .send()
        .await
        .unwrap();

    println!("{:?}", res.status());
    println!("{:?}", res.text().await.unwrap());
}

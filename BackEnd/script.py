import os
import pandas as pd
import re
from datetime import datetime
import sys
import random

class PlayRecommender:
    def __init__(self, plays_path):
        """Initialize the recommender with the plays dataset."""
        self.plays_df = pd.read_csv("backend/input/" + plays_path)
        
    def parse_situation(self, description):
        """Extract game situation details from the description."""
        # Parse down and distance
        down_pattern = r'(\d)(?:st|nd|rd|th)\s+(?:and|&)\s+(\d+)'
        down_match = re.search(down_pattern, description.lower())
        
        # Parse field position if provided
        field_pattern = r'(?:at|from|on)\s+(?:the\s+)?(?:own|opp)?\s*(\d+)'
        field_match = re.search(field_pattern, description.lower())
        
        # Parse score situation if provided
        score_pattern = r'(?:up|down|trailing|leading)\s+by\s+(\d+)'
        score_match = re.search(score_pattern, description.lower())
        
        return {
            'down': int(down_match.group(1)) if down_match else None,
            'distance': int(down_match.group(2)) if down_match else None,
            'yardline': int(field_match.group(1)) if field_match else None,
            'score_diff': int(score_match.group(1)) if score_match else None
        }

    def find_similar_plays(self, situation, limit=5):
        """Find similar successful plays based on the game situation."""
        # Start with base dataset
        similar_plays = self.plays_df.copy()
        
        # Filter by down if provided
        if situation['down']:
            similar_plays = similar_plays[similar_plays['down'] == situation['down']]
        
        # Filter by distance with some flexibility
        if situation['distance']:
            distance = situation['distance']
            similar_plays = similar_plays[
                similar_plays['yardsToGo'].between(distance - 2, distance + 2)
            ]
        
        # Filter by field position if provided
        if situation['yardline']:
            yardline = situation['yardline']
            similar_plays = similar_plays[
                similar_plays['absoluteYardlineNumber'].between(yardline - 5, yardline + 5)
            ]
        
        # Calculate play success
        similar_plays['success'] = (
            (similar_plays['yardsToGo'] <= similar_plays['playResult']) |  # First down
            (similar_plays['playResult'] >= 10) |  # Big play
            (similar_plays['epa'] > 0.5)  # High EPA
        )
        
        # Filter for successful plays and sort by EPA
        successful_plays = similar_plays[similar_plays['success']].sort_values('epa', ascending=False)
        
        return successful_plays.head(limit)

    def format_play_recommendation(self, play):
        """Format a single play recommendation with detailed information."""
        return {
            'gameId': play['gameId'],  # Include gameId
            'playId': play['playId'],  # Include playId
            'description': play['playDescription'],
            'formation': play['offenseFormation'],
            'personnel_offense': play['personnelO'],
            'play_type': play['playType'],
            'yards_gained': play['playResult'],
            'epa': round(play['epa'], 2),
            'week': play['week'],
            'defense_info': {
                'defenders_in_box': play['defendersInTheBox'],
                'pass_rushers': play['numberOfPassRushers'],
                'personnel': play['personnelD']
            },
            'situation': {
                'down': play['down'],
                'distance': play['yardsToGo'],
                'quarter': play['quarter'],
                'field_position': f"{play['yardlineSide']} {play['yardlineNumber']}"
            }
        }

    def analyze_play_situation(self, description):
        """Analyze the situation and return recommended plays."""
        # Parse the situation
        situation = self.parse_situation(description)
        
        if situation['down'] is None and situation['distance'] is None:
            return "Could not determine down and distance. Please use format like '3rd and 5'."
        
        # Find similar successful plays
        recommended_plays = self.find_similar_plays(situation)
        
        if recommended_plays.empty:
            return "No successful plays found for this situation."
        
        # Format recommendations
        return [self.format_play_recommendation(play) for _, play in recommended_plays.iterrows()]

def main():
    # Initialize the recommender
    recommender = PlayRecommender("plays.csv")
    
    while True:

        description = sys.argv[1]
        
        if description.lower() == 'quit':
            break
            
        results = recommender.analyze_play_situation(description)
        
        if isinstance(results, str):
            print("results")
        else:
            # Only print the gameId and playId for one play
            if results:
                play = results[0]  # Get the first play
                print(f"\nGame ID: {play['gameId']}, Play ID: {play['playId']}")
                print("-" * 50)
                return play['week'], play['playId'], play['gameId']
            
def test():
    offensive_formations = [
    "I-Formation",
    "Shotgun Formation",
    "Pistol Formation",
    "Singleback Formation",
    "Spread Formation",
    "Wing-T Formation",
    "Empty Backfield",
    "Pro-Set Formation",
    "Tight Formation",
    "Wildcat Formation"
]
    # Personnel Groupings
    personnel_groupings = [
        "11 Personnel (1 TE, 1 RB, 3 WR)",
        "12 Personnel (1 TE, 2 RB, 2 WR)",
        "21 Personnel (2 TE, 1 RB, 2 WR)",
        "22 Personnel (2 TE, 2 RB, 1 WR)",
        "10 Personnel (1 TE, 0 RB, 4 WR)",
        "13 Personnel (1 TE, 3 RB, 1 WR)",
        "00 Personnel (5 WR)"
    ]

    # Randomly select one from each
    random_formation = random.choice(offensive_formations)
    random_personnel = random.choice(personnel_groupings)

    # Format them one on top of the other
    return f"The offensive formation is {random_formation}, and the personnel grouping is {random_personnel}."

if __name__ == "__main__":
    week, play_id, game_id = main()
    from sports_backend import animate_player_movement, run_animation
    anime_one = animate_player_movement(week, play_id, game_id)
    run_animation(anime_one)

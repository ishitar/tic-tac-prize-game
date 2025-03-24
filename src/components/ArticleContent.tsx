
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';

const ArticleContent: React.FC = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold tracking-tight md:text-4xl">
        Apple Releases New iOS Update with Enhanced Gaming Features
      </h1>
      
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <span>By Sarah Johnson</span>
        <span>•</span>
        <span>May 15, 2023</span>
      </div>
      
      <div className="relative h-[300px] overflow-hidden rounded-xl bg-gray-100">
        <img 
          src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?auto=format&fit=crop&q=80" 
          alt="Apple devices" 
          className="object-cover w-full h-full"
        />
      </div>
      
      <Card className="border-none shadow-sm">
        <CardHeader className="p-4 pb-2">
          <CardTitle className="text-lg">Key Highlights</CardTitle>
          <CardDescription>New features in today's update</CardDescription>
        </CardHeader>
        <CardContent className="p-4 pt-0">
          <ul className="list-disc pl-5 space-y-1">
            <li>Enhanced gaming performance with Metal API improvements</li>
            <li>New Game Center integration with social features</li>
            <li>Battery optimization for mobile gaming</li>
            <li>Controller support for more gaming peripherals</li>
          </ul>
        </CardContent>
      </Card>
      
      <div className="space-y-4 text-gray-700">
        <p>
          Apple has released its latest iOS update today, focusing heavily on improved gaming performance 
          and new features for mobile gamers. The update, which is available for iPhone users worldwide, 
          brings significant improvements to gaming performance through enhanced Metal API optimizations.
        </p>
        
        <p>
          "We're committed to providing the best gaming experience on mobile devices," said Craig Federighi, 
          Apple's senior vice president of Software Engineering. "This update represents our dedication to 
          the growing community of mobile gamers who choose Apple devices."
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">Performance Improvements</h2>
        
        <p>
          The new update introduces several performance enhancements that will benefit both casual and serious gamers. 
          According to Apple, games should run 15-20% faster on compatible devices, with improved frame rates and 
          reduced loading times.
        </p>
        
        <p>
          Developers are already praising the improvements. "The new Metal API optimizations have allowed us to 
          push the boundaries of what's possible in mobile gaming," said Mark Thompson, lead developer at GameCraft Studios. 
          "Our latest title runs significantly smoother on iOS devices after this update."
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">Game Center Enhancements</h2>
        
        <p>
          The update also brings major improvements to Game Center, Apple's gaming social network. Users can now 
          create gaming profiles with customizable avatars, track achievements across different games, and join 
          gaming communities based on their interests.
        </p>
        
        <p>
          The company has also introduced a new "Game Mode" that temporarily adjusts system settings to prioritize 
          gaming performance when a game is launched. This includes minimizing background processes and optimizing 
          CPU and GPU usage for the best possible experience.
        </p>
        
        <p>
          For competitive gamers, the update introduces improved matchmaking algorithms and in-game voice chat 
          capabilities with noise cancellation features.
        </p>
        
        <h2 className="text-2xl font-semibold mt-6 mb-3">Availability</h2>
        
        <p>
          The update is available now for iPhone XS and newer models. To install, users can go to 
          Settings {'>'}  General {'>'}  Software Update. Apple recommends backing up devices before installing the update.
        </p>
      </div>
    </div>
  );
};

export default ArticleContent;

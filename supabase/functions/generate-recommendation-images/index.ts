import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompts } = await req.json();

    if (!prompts || !Array.isArray(prompts)) {
      return new Response(
        JSON.stringify({ error: 'prompts array is required' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    console.log('Generating images for prompts:', prompts.length);

    // Generate images using Lovable AI
    const images = await Promise.all(
      prompts.map(async (prompt: string) => {
        try {
          const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${Deno.env.get('LOVABLE_API_KEY')}`,
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              model: 'google/gemini-2.5-flash-image-preview',
              messages: [
                {
                  role: 'user',
                  content: prompt,
                },
              ],
              modalities: ['image', 'text'],
            }),
          });

          if (!response.ok) {
            console.error('AI API error:', await response.text());
            return null;
          }

          const data = await response.json();
          const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
          
          console.log('Generated image for prompt:', prompt.substring(0, 50));
          
          return imageUrl || null;
        } catch (error) {
          console.error('Error generating image:', error);
          return null;
        }
      })
    );

    return new Response(
      JSON.stringify({ images }),
      { 
        status: 200, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
      }
    );
  } catch (error) {
    console.error('Error in generate-recommendation-images:', error);
    return new Response(
      JSON.stringify({ error: String(error) }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});

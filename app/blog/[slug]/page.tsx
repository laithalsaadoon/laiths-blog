import { notFound } from 'next/navigation'
import type { Metadata } from 'next'
import { Amplify } from 'aws-amplify';
import outputs from '@/amplify_outputs.json';
import type { Schema } from '@/amplify/data/resource';
import { generateClient } from 'aws-amplify/api';
import { cache } from 'react';

Amplify.configure(outputs);

const client = generateClient<Schema>({});

// Force static generation
export const dynamic = 'force-static'
export const dynamicParams = false
export const revalidate = 3600 // Revalidate every hour

async function getPost(slug: string) {
  try {
    const {data: post} = await client.models.Post.listPostBySlug({slug: slug}, {
      authMode: 'identityPool'
    });
    if (!post) return null;
    return post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

const getAllPosts = cache(async () => {
  try {
    const {data: posts} = await client.models.Post.list({
      authMode: 'identityPool'
    });
    return posts;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
});

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const paramAwaited = await Promise.resolve(params)

  const post = await getPost(paramAwaited.slug);
  const postData = post?.[0]
  
  if (!postData) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.'
    }
  }

  const metadata: Metadata = {
    title: postData?.title || 'Untitled Post',
    description: postData?.excerpt || undefined,
    openGraph: {
      title: postData?.title || 'Untitled Post',
      description: postData?.excerpt || undefined,
      type: 'article',
      publishedTime: postData?.publishDate || undefined,
    },
  }

  return metadata;
}

export async function generateStaticParams() {
  const allPosts = await getAllPosts();
  
  return allPosts.map((post) => ({
    slug: post.slug,
  }))
}


export default async function BlogPost({ params }: { params: Promise<{ slug: string }> }) {
  const slug = (await params).slug;
  const post = await getPost(slug);
  const postData = post?.[0]


  if (!postData) {
    notFound();
  }

  const formattedDate = postData?.publishDate ? new Date(postData.publishDate).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }) : null;

  return (
    <article className="py-16 lg:py-20">
      <header className="mb-16 lg:mb-20 lg:text-center">
        {formattedDate && (
          <time 
            className="block mb-6 text-sm text-gray-600 dark:text-gray-400"
            dateTime={postData.publishDate || undefined}
          >
            {formattedDate}
          </time>
        )}
        <h1 className="text-4xl font-bold tracking-tight gradient-text sm:text-5xl">
          {postData?.title || 'Untitled Post'}
        </h1>
      </header>
      <div className="prose prose-lg dark:prose-invert mx-auto">
        {(postData?.content || '').split('\n').map((paragraph: string, i: number) => (
          <p key={`${slug}-${i}-${paragraph.substring(0, 20)}`} className="mb-4">
            {paragraph.trim()}
          </p>
        ))}
      </div>
    </article>
  )
} 

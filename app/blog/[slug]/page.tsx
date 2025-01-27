import { generateClient } from 'aws-amplify/api';
import { notFound } from 'next/navigation'
import type { Schema } from '@/amplify/data/resource';
import { Amplify } from 'aws-amplify'
import config from '@/amplify_outputs.json'

Amplify.configure(config)

async function getPost(slug: string) {
  const client = generateClient<Schema>();
  const post = await client.models.Post.get({id: slug}, {authMode: 'identityPool'});
  return post;
}

export async function generateStaticParams() {
  // This function tells Next.js which paths to pre-render
  return [
    { slug: 'hello_world' },
    { slug: 'introducing-animaginary' }
  ]
}

interface Props {
  params: {
    slug: string
  }
}

export default async function BlogPost({ params }: Props) {
  const slug = await Promise.resolve(params).then(params => params.slug);
  
  if (!slug) {
    notFound()
  }

  const post = await getPost(slug)
  console.log(post)
  if (!post) {
    notFound()
  }

  return (
    <article className="py-16 lg:py-20">
      <header className="mb-16 lg:mb-20 lg:text-center">
        <time className="block mb-6 text-sm text-gray-600 dark:text-gray-400">
          {post.data?.publishDate}
        </time>
        <h1 className="text-4xl font-bold tracking-tight gradient-text sm:text-5xl">
          {post.data?.title}
        </h1>
      </header>
      <div className="prose prose-lg dark:prose-invert mx-auto">
        {post.data?.content.split('\n').map((paragraph, i) => (
          <p key={`${slug}-${i}-${paragraph.substring(0, 20)}`} className="mb-4">
            {paragraph.trim()}
          </p>
        ))}
      </div>
    </article>
  )
} 

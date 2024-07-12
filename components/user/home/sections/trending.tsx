'use client';
import React from 'react';
import Link from 'next/link';

import { TrendingLoadingSkeleton } from '@/utils/loadingSkeleton';
import { TopTrendingTypes } from '@/helpers/types/types';
import { formatDateAndTime } from '@/utils/dateTime';

const TopTrending = ({ loading, trendingBlogs }: TopTrendingTypes) => {
  if (loading) {
    return <TrendingLoadingSkeleton />;
  }
  return (
    <>
      {!loading &&
        trendingBlogs?.map((data: any, index: number) => {
          const { id, title, timestamp, category } = data;
          return (
            <Link
              key={index}
              href={`/${encodeURIComponent(
                category.toLowerCase()
              )}&title=${title}`}
            >
              <div className="mb-6 pb-3 border-b hover:text-gray-500">
                <p className="text-lg">{title}</p>
                <p className="font-semibold">
                  {formatDateAndTime(timestamp.toDate())}
                </p>
              </div>
            </Link>
          );
        })}
    </>
  );
};

export default TopTrending;

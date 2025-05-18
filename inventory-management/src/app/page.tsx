"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightLeft, Headphones } from "lucide-react";
import Image from "next/image";

export default function DashboardPage() {
  return (
    <main className="p-6 space-y-6 bg-white min-h-screen">
      <div className="text-2xl font-bold text-black leading-tight">
        Hi, here&apos;s what&apos;s happening <br /> in your stores
        </div>
      <div className="flex flex-wrap gap-4">
        <Button variant="outline">Today</Button>
        <Button variant="outline">This Week</Button>
        <Button variant="outline">This Month</Button>
        <select className="px-3 py-2 rounded-md border">
          <option>All Outlets</option>
        </select>
      </div>
      


      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-col">
        {/* Sales summary */}
        <Card className= "flex-col">
          <CardContent className="p-6">
            <div className="text-sm text-gray-500 mb-1">This month your stores have sold</div>
            <div className="text-2xl font-semibold text-black">$8619.86</div>
            <div className="text-sm text-gray-400">That’s $1780.24 more than this time last month!</div>
          </CardContent>
        

        
       
          <CardContent className="p-6">
            <div className="text-sm text-gray-500 mb-1">Average Sale Value</div>
            <div className="text-xl font-semibold text-black">$48.68</div>
            <div className="text-sm text-gray-400">Average Items per Sale</div>
            <div className="text-xl font-semibold text-black">2.8</div>
            <div className="text-sm text-gray-400">0.95 items than last month</div>
          </CardContent>
       

        {/* Graph placeholder */}
        <Card className="lg:col-span-1 md:col-span-2">
          <CardContent className="p-6">
            <div className="text-sm font-medium text-gray-500 mb-2">All Outlets</div>
            <div className="h-32 bg-gray-100 rounded" />
          </CardContent>
        </Card>
        </Card>

        {/* Your sales this month */}
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <div className="flex justify-between text-sm text-gray-500 mb-2">
              <span>Your Sales this Month</span>
              <span className="text-blue-500 cursor-pointer">+ SHOW MORE RETAIL METRICS</span>
            </div>
            <div className="h-32 bg-gray-100 rounded mb-4" />
            <div className="grid grid-cols-3 text-sm text-gray-700">
              <div>
                <div className="font-semibold text-black">$800.80</div>
                <div>Your Sales Targets</div>
              </div>
              <div>
                <div className="font-semibold text-black">$61.34</div>
                <div>Average Sales Targets</div>
              </div>
              <div>
                <div className="font-semibold text-black">8</div>
                <div>Average Items per Sale</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Transfer */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center gap-2 text-sm mb-3">
              <ArrowRightLeft className="w-4 h-4" />
              <span>You have 1 transfer waiting to be received</span>
            </div>
            <div className="flex items-center gap-4">
              <Headphones className="w-10 h-10 text-gray-500" />
              <div className="text-sm">
                <div className="font-semibold text-black">Beats Studio Pro</div>
                <div className="text-gray-500">Texas warehouse → IT Dept.</div>
              </div>
            </div>
            <Button variant="link" className="p-0 mt-2 text-blue-500 text-sm">VIEW TRANSFER</Button>
          </CardContent>
        </Card>

        {/* Purchase Orders */}
        <Card>
          <CardContent className="p-6">
            <div className="text-sm mb-3">You have 6 dispatched orders waiting to be received</div>
            <div className="flex items-center gap-2 mb-2">
              <Image src="/placeholder-product.png" width={40} height={40} alt="Product" />
              <Image src="/placeholder-product.png" width={40} height={40} alt="Product" />
              <Image src="/placeholder-product.png" width={40} height={40} alt="Product" />
              <Image src="/placeholder-product.png" width={40} height={40} alt="Product" />
            </div>
            <Button variant="link" className="p-0 text-blue-500 text-sm">VIEW DISPATCHED ORDERS</Button>
          </CardContent>
        </Card>
      </div>
    </main>
  );

  
}

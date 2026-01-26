import { useState } from "react";
import { Helmet } from "react-helmet";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Lightbulb, Map, Megaphone } from "lucide-react";
import PortalIdeas from "@/components/portal/PortalIdeas";
import PortalRoadmap from "@/components/portal/PortalRoadmap";
import PortalUpdates from "@/components/portal/PortalUpdates";

const PortalPage = () => {
  const [activeTab, setActiveTab] = useState("ideas");

  return (
    <>
      <Helmet>
        <title>Портал обновлений | Нейрорешения</title>
        <meta name="description" content="Следите за развитием продуктов, предлагайте идеи и узнавайте о новых обновлениях. Ваш голос важен для нас." />
      </Helmet>

      <main className="min-h-screen bg-background pt-24 pb-16">
        <div className="container mx-auto px-4">
          {/* Header */}
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
              Портал обновлений
            </h1>
            <p className="text-lg text-muted-foreground">
              Предлагайте идеи, следите за дорожной картой и узнавайте о новых возможностях. 
              Ваш голос помогает нам становиться лучше.
            </p>
          </div>

          {/* Tabs */}
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            <TabsList className="grid w-full max-w-lg mx-auto grid-cols-3 mb-8">
              <TabsTrigger value="ideas" className="flex items-center gap-2">
                <Lightbulb className="h-4 w-4" />
                <span className="hidden sm:inline">Идеи</span>
              </TabsTrigger>
              <TabsTrigger value="roadmap" className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                <span className="hidden sm:inline">Дорожная карта</span>
              </TabsTrigger>
              <TabsTrigger value="updates" className="flex items-center gap-2">
                <Megaphone className="h-4 w-4" />
                <span className="hidden sm:inline">Обновления</span>
              </TabsTrigger>
            </TabsList>

            <TabsContent value="ideas">
              <PortalIdeas />
            </TabsContent>

            <TabsContent value="roadmap">
              <PortalRoadmap />
            </TabsContent>

            <TabsContent value="updates">
              <PortalUpdates />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </>
  );
};

export default PortalPage;

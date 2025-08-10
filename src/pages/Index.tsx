import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { ScrollArea } from '@/components/ui/scroll-area';
import Icon from '@/components/ui/icon';

const minecraftVersions = [
  '1.16.5', '1.17', '1.17.1', '1.18', '1.18.1', '1.18.2', '1.19', '1.19.1', '1.19.2', 
  '1.19.3', '1.19.4', '1.20', '1.20.1', '1.20.2', '1.20.3', '1.20.4', '1.20.5', 
  '1.20.6', '1.21', '1.21.1', '1.21.2', '1.21.3', '1.21.4', '1.21.5', '1.21.6', '1.21.7', '1.21.8'
];

const javaVersions = ['6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20', '21', '22', '23'];
const serverCores = ['Spigot', 'Paper', 'Purpur'];

const examplePlugins = [
  {
    name: "EconomyPlus",
    description: "Плагин экономики с банками и магазинами",
    category: "Экономика",
    downloads: "12.5K"
  },
  {
    name: "PvPArena",
    description: "Создание арен для PvP сражений",
    category: "PvP",
    downloads: "8.3K"
  },
  {
    name: "CustomItems",
    description: "Создание уникальных предметов",
    category: "Предметы",
    downloads: "15.7K"
  }
];

const faqItems = [
  {
    question: "Как работает генерация плагинов?",
    answer: "ИИ анализирует ваше описание и создает полнофункциональный плагин с исходным кодом на Java, готовый для компиляции в .jar файл."
  },
  {
    question: "Поддерживаются ли все версии Minecraft?",
    answer: "Да, мы поддерживаем все популярные версии от 1.16.5 до последней 1.21.8, а также различные ядра серверов."
  },
  {
    question: "Можно ли редактировать сгенерированный код?",
    answer: "Конечно! Вы получаете полный исходный код плагина, который можете модифицировать под свои нужды."
  }
];

const translations = {
  ru: {
    title: "GotFlip",
    subtitle: "ИИ Генератор плагинов для Minecraft",
    description: "Создавайте плагины любой сложности для вашего Minecraft сервера с помощью искусственного интеллекта",
    generator: "Генератор плагинов",
    examples: "Примеры плагинов",
    support: "Поддержка",
    faq: "FAQ",
    minecraftVersion: "Версия Minecraft",
    javaVersion: "Версия Java",
    serverCore: "Ядро сервера",
    pluginDescription: "Описание плагина",
    pluginDescriptionPlaceholder: "Опишите что должен делать ваш плагин...",
    generateButton: "🚀 Генерировать плагин",
    downloadButton: "📥 Скачать .jar файл",
    darkTheme: "Темная тема",
    adminPanel: "Админ панель",
    adminCode: "Код доступа",
    users: "Пользователи",
    requests: "Запросы",
    chat: "Чат",
    online: "Онлайн",
    category: "Категория",
    downloads: "Скачиваний"
  },
  en: {
    title: "GotFlip",
    subtitle: "AI Minecraft Plugin Generator",
    description: "Create plugins of any complexity for your Minecraft server using artificial intelligence",
    generator: "Plugin Generator",
    examples: "Plugin Examples",
    support: "Support",
    faq: "FAQ",
    minecraftVersion: "Minecraft Version",
    javaVersion: "Java Version",
    serverCore: "Server Core",
    pluginDescription: "Plugin Description",
    pluginDescriptionPlaceholder: "Describe what your plugin should do...",
    generateButton: "🚀 Generate Plugin",
    downloadButton: "📥 Download .jar file",
    darkTheme: "Dark Theme",
    adminPanel: "Admin Panel",
    adminCode: "Access Code",
    users: "Users",
    requests: "Requests",
    chat: "Chat",
    online: "Online",
    category: "Category",
    downloads: "Downloads"
  }
};

export default function Index() {
  const [language, setLanguage] = useState<'ru' | 'en'>('ru');
  const [isDark, setIsDark] = useState(false);
  const [minecraftVersion, setMinecraftVersion] = useState('');
  const [javaVersion, setJavaVersion] = useState('');
  const [serverCore, setServerCore] = useState('');
  const [pluginDescription, setPluginDescription] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [adminCode, setAdminCode] = useState('');
  const [isAdminOpen, setIsAdminOpen] = useState(false);
  const [generatedPlugin, setGeneratedPlugin] = useState<string | null>(null);
  
  const downloadRef = useRef<HTMLAnchorElement>(null);
  
  const t = translations[language];
  
  React.useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark);
  }, [isDark]);

  const handleGenerate = async () => {
    if (!minecraftVersion || !javaVersion || !serverCore || !pluginDescription.trim()) {
      alert('Пожалуйста, заполните все поля');
      return;
    }
    
    setIsGenerating(true);
    
    // Симуляция генерации плагина
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const pluginName = pluginDescription.split(' ')[0] || 'MyPlugin';
    const pluginContent = `// Generated plugin: ${pluginName}
package com.gotflip.${pluginName.toLowerCase()};

import org.bukkit.plugin.java.JavaPlugin;
import org.bukkit.command.Command;
import org.bukkit.command.CommandSender;
import org.bukkit.entity.Player;

public class ${pluginName} extends JavaPlugin {
    
    @Override
    public void onEnable() {
        getLogger().info("${pluginName} v1.0 enabled!");
        // Plugin logic for: ${pluginDescription}
    }
    
    @Override
    public void onDisable() {
        getLogger().info("${pluginName} disabled!");
    }
    
    @Override
    public boolean onCommand(CommandSender sender, Command command, String label, String[] args) {
        if (!(sender instanceof Player)) {
            sender.sendMessage("Only players can use this command!");
            return true;
        }
        
        Player player = (Player) sender;
        // Command implementation here
        player.sendMessage("Hello from ${pluginName}!");
        return true;
    }
}`;

    setGeneratedPlugin(pluginContent);
    setIsGenerating(false);
    
    // Автоматическое скачивание
    const blob = new Blob([pluginContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const link = downloadRef.current;
    if (link) {
      link.href = url;
      link.download = `${pluginName}.jar`;
      link.click();
    }
  };

  const handleAdminAccess = () => {
    if (adminCode === '908070605040302010') {
      setIsAdminOpen(true);
      setAdminCode('');
    } else {
      alert('Неверный код доступа');
      setAdminCode('');
    }
  };

  return (
    <div className={`min-h-screen transition-colors duration-300 ${isDark ? 'dark bg-gradient-to-br from-gray-900 via-purple-900 to-black' : 'bg-gradient-to-br from-purple-50 via-white to-purple-100'}`}>
      {/* Hidden download link */}
      <a ref={downloadRef} style={{ display: 'none' }} />
      
      {/* Header */}
      <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-minecraft-purple to-minecraft-green rounded-lg flex items-center justify-center text-white font-bold text-xl">
              🎮
            </div>
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-minecraft-purple to-minecraft-green bg-clip-text text-transparent" style={{fontFamily: 'Orbitron, monospace'}}>
                {t.title}
              </h1>
              <p className="text-sm text-muted-foreground">{t.subtitle}</p>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Icon name="Sun" size={16} />
              <Switch checked={isDark} onCheckedChange={setIsDark} />
              <Icon name="Moon" size={16} />
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setLanguage(language === 'ru' ? 'en' : 'ru')}
              className="gap-2"
            >
              <Icon name="Globe" size={16} />
              {language.toUpperCase()}
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline" size="sm" className="gap-2">
                  <Icon name="Shield" size={16} />
                  {t.adminPanel}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>{t.adminPanel}</DialogTitle>
                </DialogHeader>
                {!isAdminOpen ? (
                  <div className="space-y-4">
                    <Input
                      type="password"
                      placeholder={t.adminCode}
                      value={adminCode}
                      onChange={(e) => setAdminCode(e.target.value)}
                    />
                    <Button onClick={handleAdminAccess} className="w-full">
                      Войти
                    </Button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    <div className="grid grid-cols-3 gap-4 text-center">
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-minecraft-purple">1,247</div>
                        <div className="text-sm text-muted-foreground">{t.users}</div>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-minecraft-green">3,891</div>
                        <div className="text-sm text-muted-foreground">{t.requests}</div>
                      </div>
                      <div className="p-4 bg-muted rounded-lg">
                        <div className="text-2xl font-bold text-minecraft-purple">42</div>
                        <div className="text-sm text-muted-foreground">{t.online}</div>
                      </div>
                    </div>
                    <ScrollArea className="h-32 p-4 bg-muted rounded-lg">
                      <div className="space-y-2 text-sm">
                        <div>👤 User123: Создал плагин экономики</div>
                        <div>👤 MinecraftPro: Скачал CustomItems.jar</div>
                        <div>👤 ServerAdmin: Генерирует PvP плагин</div>
                        <div>👤 GameDev2024: Создал плагин для квестов</div>
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center mb-12">
          <div className="relative">
            <h2 className="text-5xl md:text-7xl font-black mb-6 bg-gradient-to-r from-minecraft-purple via-minecraft-green to-minecraft-purple bg-clip-text text-transparent animate-pulse" style={{fontFamily: 'Orbitron, monospace'}}>
              MINECRAFT AI
            </h2>
            <div className="absolute -top-4 -right-4 w-16 h-16 bg-minecraft-green/20 rounded-lg animate-bounce hidden md:block" />
            <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-minecraft-purple/20 rounded-lg animate-bounce delay-300 hidden md:block" />
          </div>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t.description}
          </p>
        </section>

        {/* Main Tabs */}
        <Tabs defaultValue="generator" className="max-w-6xl mx-auto">
          <TabsList className="grid w-full grid-cols-4 mb-8">
            <TabsTrigger value="generator" className="gap-2">
              <Icon name="Zap" size={16} />
              {t.generator}
            </TabsTrigger>
            <TabsTrigger value="examples" className="gap-2">
              <Icon name="Package" size={16} />
              {t.examples}
            </TabsTrigger>
            <TabsTrigger value="support" className="gap-2">
              <Icon name="MessageCircle" size={16} />
              {t.support}
            </TabsTrigger>
            <TabsTrigger value="faq" className="gap-2">
              <Icon name="HelpCircle" size={16} />
              {t.faq}
            </TabsTrigger>
          </TabsList>

          {/* Plugin Generator */}
          <TabsContent value="generator">
            <Card className="bg-card/50 backdrop-blur-sm border-2 border-minecraft-purple/20 shadow-2xl">
              <CardHeader className="text-center">
                <CardTitle className="text-3xl font-bold text-minecraft-purple flex items-center justify-center gap-3">
                  <Icon name="Cpu" size={32} />
                  {t.generator}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.minecraftVersion}</label>
                    <Select value={minecraftVersion} onValueChange={setMinecraftVersion}>
                      <SelectTrigger className="border-minecraft-purple/30">
                        <SelectValue placeholder="Выберите версию" />
                      </SelectTrigger>
                      <SelectContent>
                        {minecraftVersions.map(version => (
                          <SelectItem key={version} value={version}>{version}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.javaVersion}</label>
                    <Select value={javaVersion} onValueChange={setJavaVersion}>
                      <SelectTrigger className="border-minecraft-purple/30">
                        <SelectValue placeholder="Выберите Java" />
                      </SelectTrigger>
                      <SelectContent>
                        {javaVersions.map(version => (
                          <SelectItem key={version} value={version}>Java {version}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-medium">{t.serverCore}</label>
                    <Select value={serverCore} onValueChange={setServerCore}>
                      <SelectTrigger className="border-minecraft-purple/30">
                        <SelectValue placeholder="Выберите ядро" />
                      </SelectTrigger>
                      <SelectContent>
                        {serverCores.map(core => (
                          <SelectItem key={core} value={core}>{core}</SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-medium">{t.pluginDescription}</label>
                  <Textarea
                    placeholder={t.pluginDescriptionPlaceholder}
                    value={pluginDescription}
                    onChange={(e) => setPluginDescription(e.target.value)}
                    className="min-h-32 border-minecraft-purple/30"
                  />
                </div>

                <div className="flex justify-center">
                  <Button
                    onClick={handleGenerate}
                    disabled={isGenerating}
                    size="lg"
                    className="bg-gradient-to-r from-minecraft-purple to-minecraft-green hover:from-minecraft-purple-dark hover:to-minecraft-green-dark text-white font-bold px-8 py-3 text-lg shadow-xl transform hover:scale-105 transition-all duration-200"
                  >
                    {isGenerating ? (
                      <>
                        <Icon name="Loader2" size={20} className="animate-spin mr-2" />
                        Генерирую...
                      </>
                    ) : (
                      t.generateButton
                    )}
                  </Button>
                </div>

                {generatedPlugin && (
                  <Card className="bg-muted/50 border-minecraft-green/30">
                    <CardHeader>
                      <CardTitle className="text-minecraft-green flex items-center gap-2">
                        <Icon name="CheckCircle" size={20} />
                        Плагин готов!
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-muted-foreground mb-4">
                        Ваш плагин был успешно сгенерирован и автоматически скачан как .jar файл
                      </p>
                      <Button variant="outline" className="gap-2 border-minecraft-green/30">
                        <Icon name="Download" size={16} />
                        {t.downloadButton}
                      </Button>
                    </CardContent>
                  </Card>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          {/* Examples */}
          <TabsContent value="examples">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {examplePlugins.map((plugin, index) => (
                <Card key={index} className="bg-card/50 backdrop-blur-sm border-minecraft-purple/20 hover:border-minecraft-green/50 transition-colors">
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <CardTitle className="text-minecraft-purple">{plugin.name}</CardTitle>
                      <Badge variant="secondary" className="bg-minecraft-green/20 text-minecraft-green">
                        {plugin.downloads}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground mb-4">{plugin.description}</p>
                    <div className="flex items-center justify-between">
                      <Badge variant="outline" className="border-minecraft-purple/30">
                        {plugin.category}
                      </Badge>
                      <Button size="sm" variant="outline" className="gap-2">
                        <Icon name="Download" size={14} />
                        Скачать
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>

          {/* Support */}
          <TabsContent value="support">
            <Card className="bg-card/50 backdrop-blur-sm border-minecraft-purple/20">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl text-minecraft-purple flex items-center justify-center gap-2">
                  <Icon name="MessageCircle" size={24} />
                  {t.support}
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="text-center space-y-4">
                  <p className="text-lg text-muted-foreground">
                    Нужна помощь? Свяжитесь с нами через любой удобный способ
                  </p>
                  <div className="flex flex-wrap justify-center gap-4">
                    <Button variant="outline" className="gap-2 border-minecraft-purple/30">
                      <Icon name="MessageSquare" size={16} />
                      Чат поддержки
                    </Button>
                    <Button variant="outline" className="gap-2 border-minecraft-purple/30">
                      <Icon name="Mail" size={16} />
                      Email: support@gotflip.dev
                    </Button>
                    <Button variant="outline" className="gap-2 border-minecraft-purple/30">
                      <Icon name="MessageCircle" size={16} />
                      Telegram
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* FAQ */}
          <TabsContent value="faq">
            <Card className="bg-card/50 backdrop-blur-sm border-minecraft-purple/20">
              <CardHeader>
                <CardTitle className="text-2xl text-minecraft-purple flex items-center gap-2">
                  <Icon name="HelpCircle" size={24} />
                  {t.faq}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {faqItems.map((item, index) => (
                    <AccordionItem key={index} value={`item-${index}`}>
                      <AccordionTrigger className="text-left hover:text-minecraft-purple">
                        {item.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {item.answer}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>

      {/* Footer */}
      <footer className="bg-background/50 backdrop-blur-sm border-t border-border mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="text-center text-muted-foreground">
            <p>© 2024 GotFlip. Создано с помощью ИИ для Minecraft сообщества 🎮</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
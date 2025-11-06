import { Image, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import useGlobalStyle from "@/styles/globalStyle";
import Header from "@/components/ui/header";
import { useTheme } from "@/hooks/themeContext";
import { useState } from "react";
import TodoList from "@/components/ui/toDoList";
import TodoInput from "@/components/ui/todoInput";
import TodoFooter from "@/components/ui/toDoFooter";

const Index = () => {
  const styles = useGlobalStyle();
  const { theme } = useTheme();
  const [filter, setFilter] = useState<"all" | "active" | "completed">("all");

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        {/* Background image */}
        <View style={styles.imgContainer}>
          <Image
            source={
              theme === "light"
                ? require("../../assets/images/lightbit.jpg")
                : require("../../assets/images/darkbit.jpg")
            }
            style={styles.img}
          />
        </View>

        {/* Main content */}
        <View style={styles.content}>
          <Header />
          <TodoInput />

          {/* 👇 Only this section should scroll */}
          <View style={{ flex: 1 }}>
            <TodoList filter={filter} />
          </View>

          <TodoFooter filter={filter} setFilter={setFilter} />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Index;

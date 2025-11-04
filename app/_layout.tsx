import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { useFonts } from "expo-font";
import "react-native-reanimated";
import { useEffect } from "react";
import { ThemeProvider } from "@/hooks/themeContext";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import Feather from "@expo/vector-icons/Feather";
import { ConvexProvider, ConvexReactClient } from "convex/react";

export {
  // Catch any errors thrown by the Layout component.
  ErrorBoundary,
} from "expo-router";

export const unstable_settings = {
  anchor: "(main)",
};

// Prevent the splash screen from auto-hiding before asset loading is complete.
// SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  // const colorScheme = useColorScheme();
  const [loaded, error] = useFonts({
    SpaceMono: require("../assets/fonts/SpaceMono-Regular.ttf"),
    JosefinSans: require("../assets/fonts/JosefinSans-Regular.ttf"),
    ...Feather.font,
  });

  useEffect(() => {
    if (error) throw error;
  }, [error]);

  if (!loaded) {
    return null;
  }

  const convex = new ConvexReactClient(process.env.EXPO_PUBLIC_CONVEX_URL!);

  return (
    <ConvexProvider client={convex}>
      <GestureHandlerRootView style={{ flex: 1 }}>
        <ThemeProvider>
          <Stack>
            <Stack.Screen name="(main)" options={{ headerShown: false }} />
          </Stack>
          <StatusBar style="auto" />
        </ThemeProvider>
      </GestureHandlerRootView>
    </ConvexProvider>
  );
}

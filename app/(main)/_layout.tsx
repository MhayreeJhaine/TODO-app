import { Stack } from "expo-router";

const MainLayout = () => {
  return (
    <Stack initialRouteName="index" screenOptions={{ headerShown: false }} />
  );
};

export default MainLayout;

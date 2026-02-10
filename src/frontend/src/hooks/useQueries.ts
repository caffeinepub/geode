import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { Mod, UserProfile } from '../backend';

export function useGetAllMods() {
  const { actor, isFetching } = useActor();

  return useQuery<Mod[]>({
    queryKey: ['mods'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getAllMods();
    },
    enabled: !!actor && !isFetching,
  });
}

export function useGetMod(modId: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Mod | null>({
    queryKey: ['mod', modId],
    queryFn: async () => {
      if (!actor) return null;
      return actor.getMod(modId);
    },
    enabled: !!actor && !isFetching && !!modId,
  });
}

export function useGetMyLibrary() {
  const { actor, isFetching } = useActor();

  return useQuery<Mod[]>({
    queryKey: ['myLibrary'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getMyLibrary();
    },
    enabled: !!actor && !isFetching,
    retry: false,
  });
}

export function useAddToLibrary() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (modId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.addToLibrary(modId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myLibrary'] });
    },
  });
}

export function useRemoveFromLibrary() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (modId: string) => {
      if (!actor) throw new Error('Actor not available');
      return actor.removeFromLibrary(modId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['myLibrary'] });
    },
  });
}

export function useGetCallerUserProfile() {
  const { actor, isFetching: actorFetching } = useActor();

  const query = useQuery<UserProfile | null>({
    queryKey: ['currentUserProfile'],
    queryFn: async () => {
      if (!actor) throw new Error('Actor not available');
      return actor.getCallerUserProfile();
    },
    enabled: !!actor && !actorFetching,
    retry: false,
  });

  return {
    ...query,
    isLoading: actorFetching || query.isLoading,
    isFetched: !!actor && query.isFetched,
  };
}

export function useSaveCallerUserProfile() {
  const { actor } = useActor();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (profile: UserProfile) => {
      if (!actor) throw new Error('Actor not available');
      return actor.saveCallerUserProfile(profile);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['currentUserProfile'] });
    },
  });
}

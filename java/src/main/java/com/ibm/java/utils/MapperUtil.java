package com.ibm.java.utils;

import org.modelmapper.ModelMapper;
import org.modelmapper.convention.MatchingStrategies;
import org.modelmapper.convention.NameTokenizers;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

@Component("mapperUtil")
public class MapperUtil {

    protected ModelMapper modelMapper;

    public MapperUtil() {
        modelMapper = new ModelMapper();
        modelMapper.getConfiguration()
                .setMatchingStrategy(MatchingStrategies.STRICT)
                .setUseOSGiClassLoaderBridging(true)
                .setPreferNestedProperties(false)
                .setSourceNameTokenizer(NameTokenizers.UNDERSCORE)
                .setDestinationNameTokenizer(NameTokenizers.UNDERSCORE);
    }

    public <D, T> D map(final T entity, Class<D> outClass) {
        return this.modelMapper.map(entity, outClass);
    }

    public <D, T> Set<D> mapAll(final Collection<T> entityList, Class<D> outCLass) {
        return entityList.stream()
                .map(entity -> map(entity, outCLass))
                .collect(Collectors.toSet());
    }

    public <D, T> List<D> mapListAll(final Collection<T> entityList, Class<D> outCLass) {
        return entityList.stream()
                .map(entity -> map(entity, outCLass))
                .collect(Collectors.toList());
    }

    public <S, D> D map(final S source, D destination) {
        this.modelMapper.map(source, destination);
        return destination;
    }

    public <D, T> Page<D> mapPageable(Page<T> entities, Class<D> dtoClass) {
        return entities.map(objectEntity -> this.modelMapper.map(objectEntity, dtoClass));
    }
}
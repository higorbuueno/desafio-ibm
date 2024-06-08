package com.ibm.java.mapper;

import com.ibm.java.utils.MapperUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.stereotype.Component;

import java.util.Collection;
import java.util.List;
import java.util.Set;

@Component
public class MapperCustom {

    @Autowired
    private MapperUtil mapperUtil;

    /**
     *
     * @param source
     * @param dest
     * @return
     * @param <S>
     * @param <D>
     */
    public <S, D> D mapTo(S source, Class<D> dest) {return mapperUtil.map(source, dest);}

    /**
     *
     * @param source
     * @param dest
     * @return
     * @param <D>
     * @param <T>
     */
    public <D, T> Set<D> mapAll(final Collection<T> source, Class<D> dest) {
        return mapperUtil.mapAll(source, dest);
    }

    public <D, T> List<D> mapListAll(final Collection<T> source, Class<D> dest) {
        return mapperUtil.mapListAll(source, dest);
    }

    /**
     *
     * @param entities
     * @param dtoClass
     * @return
     * @param <D>
     * @param <T>
     */
    public <D, T> Page<D> mapPageable(Page<T> entities, Class<D> dtoClass) {
        return entities.map(objectEntity -> mapperUtil.map(objectEntity, dtoClass));
    }

}
